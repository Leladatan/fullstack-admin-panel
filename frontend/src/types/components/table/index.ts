import { Dispatch, SetStateAction } from "react";

export type TableType = TablePaginationType & TableSearchWithButtonType & TableComponentType & { isFetching: boolean };

export type TablePaginationType = {
  setLimit: Dispatch<SetStateAction<number>>;
  limit: number;
  total: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export type TableSearchWithButtonType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleModal: () => void;
  searchPlaceholder: string;
};

export type TableComponentType = {
  rowData: any[];
  columnDefs: any[];
  isFetching: boolean;
};
