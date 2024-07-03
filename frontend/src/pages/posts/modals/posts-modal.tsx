import FormButtons from "@/components/ui/form/form-buttons";
import { ModalAddType } from "@/types/components/modal";
import Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import keys from "@/constants/keys";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import ControlledInput from "@/components/ui/controlled-input";
import { requiredRules } from "@/constants/rules";
import { PostAddType, PostEditType, PostType } from "@/types/actions/posts";
import { postsRequest } from "@/actions/posts";
import ControlledSelect from "@/components/ui/controlled-select";
import { usersRequest } from "@/actions/users";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce.ts";

const PostsModal = ({ id, type, data, onClose }: ModalAddType<PostType>) => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, formState } = useForm<PostAddType | PostEditType>({
    mode: "all",
    delayError: 200,
    reValidateMode: "onBlur",
    defaultValues: { ...data, userId: id ? id.toString() : "" },
  });

  const { isValid, isDirty } = formState;

  const [optionsForUsers, setOptionsForUsers] = useState<{ label: string; value: string }[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue: string = useDebounce(searchValue, 500);

  const { data: usersData } = useQuery({
    queryKey: [`${keys.users}/posts-select`, debouncedValue],
    queryFn: () => usersRequest.getUsers({ username: debouncedValue, limit: 100, offset: 0 }),
    keepPreviousData: true,
  });

  const { mutate: create, isLoading: createLoading } = useMutation({
    mutationKey: [`${keys.posts}/add`],
    mutationFn: (values: PostAddType) => postsRequest.createPost(values),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries([keys.posts]);
      toast.success("Публикация успешно создана");
      onClose();
    },
    onError: (error: AxiosError<{ message: { response: { data: { message: string } } } }>): void => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message as unknown as string);
      }

      toast.error("Произошла ошибка");
    },
  });

  const { mutate: update, isLoading: updateLoading } = useMutation({
    mutationKey: [`${keys.posts}/update`],
    mutationFn: (values: PostAddType) => postsRequest.updatePost({ id, payload: values }),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries([keys.posts]);
      toast.success("Публикация успешно обновлена");
      onClose();
    },
    onError: (error: AxiosError<{ message: { response: { data: { message: string } } } }>): void => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message as unknown as string);
      }

      toast.error("Произошла ошибка");
    },
  });

  const handleSearch = (value: string): void => {
    setSearchValue(value);
  };

  const onSubmit = (data: PostAddType | PostEditType): void => {
    if (type === "update") {
      update({ ...data, userId: +data.userId });
      return;
    }

    create({ ...data, userId: +data.userId });
  };

  useEffect((): void => {
    if (usersData) {
      setOptionsForUsers(usersData.items.map((user) => ({ label: user.username, value: user.id.toString() })));
    }
  }, [usersData]);

  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        name={"title"}
        label={"Заголовок"}
        placeholder={"Введите заголовок"}
        rules={{ ...requiredRules }}
      />
      <ControlledInput
        control={control}
        name={"description"}
        label={"Описание"}
        placeholder={"Введите описание"}
        rules={{ ...requiredRules }}
        type={"textarea"}
      />
      <ControlledSelect
        control={control}
        name={"userId"}
        options={optionsForUsers}
        label={"Автор"}
        placeholder={"Выберите автора"}
        rules={{ ...requiredRules }}
        value={debouncedValue}
        onSearch={handleSearch}
        showSearch
      />
      <FormButtons
        label={type === "add" ? "Добавить" : "Сохранить"}
        disabled={!isValid || !isDirty || createLoading || updateLoading}
        onClose={onClose}
      />
    </Form>
  );
};

export default PostsModal;
