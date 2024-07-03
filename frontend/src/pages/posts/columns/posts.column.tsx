import { PostType } from "@/types/actions/posts";
import { getDateFormat } from "@/utils";
import { CustomColumnType } from "@/types/components/column";
import ButtonEdit from "@/components/ui/actions/btn-edit";
import ButtonDelete from "@/components/ui/actions/btn-delete";

export const getPostsColumn = ({ handleDelete, handleEdit }: CustomColumnType<PostType>) => {
  return [
    { field: "title", headerName: "Заголовок", flex: 1 },
    { field: "description", headerName: "Описание", flex: 1 },
    {
      field: "user",
      headerName: "Автор",
      flex: 1,
      cellRenderer: ({ data }: { data: PostType }) => {
        return (
          <>
            {data.user && (
              <span>
                {data.user.surname} {data.user.name} {data.user.patronymic} ({data.user.username})
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Дата публикации",
      flex: 1,
      cellRenderer: ({ data }: { data: PostType }) => {
        return <>{getDateFormat(data.createdAt)}</>;
      },
    },
    {
      field: "actions",
      headerName: "Действия",
      flex: 1,
      cellRenderer: ({ data }: { data: PostType }) => {
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
