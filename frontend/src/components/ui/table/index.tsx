import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { TableType } from "@/types/components/table";
import "@/components/ui/table/table.scss";
import TablePagination from "@/components/ui/table/_components/pagination";
import TableComponent from "@/components/ui/table/_components/table";
import TableSearchWithButton from "@/components/ui/table/_components/search-with-button";

const Table = ({
  rowData,
  columnDefs,
  total,
  currentPage,
  limit,
  setLimit,
  setPage,
  search,
  setSearch,
  handleModal,
  isFetching,
  searchPlaceholder,
}: TableType) => {
  return (
    <div className="table">
      <TableSearchWithButton
        handleModal={handleModal}
        search={search}
        setSearch={setSearch}
        searchPlaceholder={searchPlaceholder}
      />
      <TableComponent rowData={rowData} columnDefs={columnDefs} isFetching={isFetching} />
      <TablePagination setLimit={setLimit} total={total} currentPage={currentPage} setPage={setPage} limit={limit} />
    </div>
  );
};

export default Table;
