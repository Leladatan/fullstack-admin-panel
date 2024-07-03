import { getDateFormat } from "@/utils";
import { UserType } from "@/types/actions/users";
import { CustomColumnType } from "@/types/components/column";
import ButtonDelete from "@/components/ui/actions/btn-delete";
import ButtonEdit from "@/components/ui/actions/btn-edit";

export const getUsersColumn = ({ handleDelete, handleEdit }: CustomColumnType<UserType>) => {
  return [
    { field: "surname", headerName: "Фамилия" },
    { field: "name", headerName: "Имя" },
    { field: "patronymic", headerName: "Отчество" },
    { field: "email", headerName: "Электронная почта", flex: 1 },
    { field: "username", headerName: "Логин", flex: 1 },
    {
      field: "createdAt",
      headerName: "Дата создания",
      cellRenderer: ({ data }: { data: UserType }) => {
        return <>{getDateFormat(data.createdAt)}</>;
      },
    },
    {
      field: "actions",
      headerName: "Действия",
      flex: 1,
      cellRenderer: ({ data }: { data: UserType }) => {
        return (
          <>
            <div className={"actions"}>
              <ButtonEdit onClick={() => handleEdit(data)} />
              <ButtonDelete onClick={() => handleDelete(data)} />
            </div>
          </>
        );
      },
    },
  ];
};
