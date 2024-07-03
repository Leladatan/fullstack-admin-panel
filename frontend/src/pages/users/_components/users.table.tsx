import Table from "@/components/ui/table";
import { getUsersColumn } from "@/pages/users/columns/users.column.tsx";
import { useMutation, useQuery } from "react-query";
import keys from "@/constants/keys";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce.ts";
import { usersRequest } from "@/actions/users";
import { UserType } from "@/types/actions/users";
import { ModalStateType } from "@/types/components/modal";
import Modal from "@/components/ui/modal";
import UsersModal from "@/pages/users/modals/users-modal.tsx";
import ModalDelete from "@/components/ui/modal/modal-delete";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const UsersTable = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const offset: number = (page - 1) * limit;

  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue: string = useDebounce(searchValue, 500);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalState, setStateModal] = useState<ModalStateType<UserType>>({
    title: "",
    type: "add",
    data: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [keys.users, debouncedValue, limit, offset],
    queryFn: () => usersRequest.getUsers({ username: debouncedValue, limit, offset }),
    keepPreviousData: true,
  });

  const { mutate: onDelete } = useMutation({
    mutationKey: [`${keys.users}/delete`],
    mutationFn: (id: number) => usersRequest.deleteUser(id),
    onSuccess: async (): Promise<void> => {
      await refetch();
      toast.success("Пользователь успешно удален");
      onClose();
    },
    onError: (error: AxiosError<{ message: { response: { data: { message: string } } } }>): void => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message as unknown as string);
      }

      toast.error("Произошла ошибка");
    },
  });

  const columns = getUsersColumn({
    handleDelete: (data: UserType) => handleModalDelete(data),
    handleEdit: (data: UserType) => handleModalUpdate(data),
  });

  const onOpen = (): void => {
    setIsModalVisible(true);
  };

  const onClose = (): void => {
    setIsModalVisible(false);
  };

  const handleModalAdd = (): void => {
    setStateModal({ title: "Добавить нового пользователя", type: "add", data: null });
    onOpen();
  };

  const handleModalUpdate = (data: UserType): void => {
    setStateModal({ title: "Редактирование пользователя", type: "update", data });
    onOpen();
  };

  const handleModalDelete = (data: UserType): void => {
    setStateModal({ title: "Вы действительно хотите удалить пользователя?", type: "delete", data });
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
        {modalState.type === "add" && <UsersModal id={0} type={"add"} onClose={onClose} />}
        {modalState.type === "delete" && modalState.data && (
          <ModalDelete id={modalState.data.id} name={modalState.data.username} onDelete={onDelete} onClose={onClose} />
        )}
        {modalState.type === "update" && modalState.data && (
          <UsersModal id={modalState.data.id} type={"update"} data={modalState.data} onClose={onClose} />
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
        searchPlaceholder={"Поиск по логину"}
      />
    </>
  );
};

export default UsersTable;
