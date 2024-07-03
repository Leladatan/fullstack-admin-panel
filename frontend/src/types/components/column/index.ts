export type CustomColumnType<T> = {
  handleDelete: (data: T) => void;
  handleEdit: (data: T) => void;
};
