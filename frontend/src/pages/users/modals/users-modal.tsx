import FormButtons from "@/components/ui/form/form-buttons";
import { ModalAddType } from "@/types/components/modal";
import Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UserAddType, UserType } from "@/types/actions/users";
import { useMutation, useQueryClient } from "react-query";
import keys from "@/constants/keys";
import { usersRequest } from "@/actions/users";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import ControlledInput from "@/components/ui/controlled-input";
import { requiredRules } from "@/constants/rules";

const UsersModal = ({ id, data, onClose, type }: ModalAddType<UserType>) => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, formState } = useForm<UserAddType>({
    mode: "all",
    delayError: 200,
    reValidateMode: "onBlur",
    defaultValues: { ...data, patronymic: (data && data.patronymic) ?? "" },
  });

  const { isValid, isDirty } = formState;

  const { mutate: create, isLoading: createLoading } = useMutation({
    mutationKey: [`${keys.users}/add`],
    mutationFn: (values: UserAddType) => usersRequest.createUser(values),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries([keys.users]);
      toast.success("Пользователь успешно создан");
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
    mutationKey: [`${keys.users}/update`],
    mutationFn: (values: UserAddType) => usersRequest.updateUser({ id, payload: values }),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries([keys.users]);
      toast.success("Пользователь успешно обновлен");
      onClose();
    },
    onError: (error: AxiosError<{ message: { response: { data: { message: string } } } }>): void => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message as unknown as string);
      }

      toast.error("Произошла ошибка");
    },
  });

  const onSubmit = (data: UserAddType): void => {
    if (type === "update") {
      update(data);
      return;
    }

    create(data);
  };

  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        name={"surname"}
        label={"Фамилия"}
        placeholder={"Введите фамилию"}
        rules={{ ...requiredRules }}
      />
      <ControlledInput
        control={control}
        name={"name"}
        label={"Имя"}
        placeholder={"Введите имя"}
        rules={{ ...requiredRules }}
      />
      <ControlledInput control={control} name={"patronymic"} label={"Отчество"} placeholder={"Введите отчество"} />
      <ControlledInput
        control={control}
        name={"username"}
        label={"Логин"}
        placeholder={"Введите логин"}
        rules={{ ...requiredRules }}
      />
      <ControlledInput
        control={control}
        name={"email"}
        label={"Электронная почта"}
        placeholder={"Введите электронную почту"}
        type={"email"}
        rules={{ ...requiredRules }}
      />
      <FormButtons
        label={type === "add" ? "Добавить" : "Сохранить"}
        disabled={!isValid || !isDirty || createLoading || updateLoading}
        onClose={onClose}
      />
    </Form>
  );
};

export default UsersModal;
