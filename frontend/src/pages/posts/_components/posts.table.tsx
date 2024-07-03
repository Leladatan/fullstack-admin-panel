import Table from "@/components/ui/table";
import { useMutation, useQuery } from "react-query";
import keys from "@/constants/keys";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce.ts";
import { ModalStateType } from "@/types/components/modal";
import Modal from "@/components/ui/modal";
import { postsRequest } from "@/actions/posts";
import { PostType } from "@/types/actions/posts";
import { getPostsColumn } from "@/pages/posts/columns/posts.column.tsx";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import ModalDelete from "@/components/ui/modal/modal-delete";
import PostsModal from "@/pages/posts/modals/posts-modal.tsx";

const PostsTable = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const offset: number = (page - 1) * limit;

  const [users, setUsers] = useState<PostType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue: string = useDebounce(searchValue, 500);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalState, setStateModal] = useState<ModalStateType<PostType>>({
    title: "",
    type: "add",
    data: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [keys.posts, debouncedValue, limit],
    queryFn: () => postsRequest.getPosts({ title: debouncedValue, limit, offset }),
    keepPreviousData: true,
  });

  const { mutate: onDelete } = useMutation({
    mutationKey: [`${keys.posts}/delete`],
    mutationFn: (id: number) => postsRequest.deletePost(id),
    onSuccess: async (): Promise<void> => {
      await refetch();
      toast.success("Публикация успешно удалена");
      onClose();
    },
    onError: (error: AxiosError<{ message: { response: { data: { message: string } } } }>): void => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message as unknown as string);
      }

      toast.error("Произошла ошибка");
    },
  });

  const columns = getPostsColumn({
    handleDelete: (data: PostType) => handleModalDelete(data),
    handleEdit: (data: PostType) => handleModalUpdate(data),
  });

  const onOpen = (): void => {
    setIsModalVisible(true);
  };

  const onClose = (): void => {
    setIsModalVisible(false);
  };

  const handleModalAdd = (): void => {
    setStateModal({ title: "Добавить новую публикацию", type: "add", data: null });
    onOpen();
  };

  const handleModalUpdate = (data: PostType): void => {
    setStateModal({ title: "Редактирование публикации", type: "update", data });
    onOpen();
  };

  const handleModalDelete = (data: PostType): void => {
    setStateModal({ title: "Вы действительно хотите удалить публикацию?", type: "delete", data });
    onOpen();
  };

  useEffect((): void => {
    if (data) {
      setUsers(data.items);
      setTotal(data.total);
    }
  }, [data]);

  return (
    <>
      <Modal title={modalState.title} isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
        {modalState.type === "add" && <PostsModal id={0} type={"add"} onClose={onClose} />}
        {modalState.type === "delete" && modalState.data && (
          <ModalDelete id={modalState.data.id} name={modalState.data.title} onDelete={onDelete} onClose={onClose} />
        )}
        {modalState.type === "update" && modalState.data && (
          <PostsModal id={modalState.data.userId} type={"update"} data={modalState.data} onClose={onClose} />
        )}
      </Modal>
      <Table
        rowData={users}
        columnDefs={columns}
        total={total}
        limit={limit}
        search={searchValue}
        setSearch={setSearchValue}
        setLimit={setLimit}
        currentPage={page}
        setPage={setPage}
        handleModal={handleModalAdd}
        isFetching={isFetching}
        searchPlaceholder={"Поиск по заголовку"}
      />
    </>
  );
};

export default PostsTable;
