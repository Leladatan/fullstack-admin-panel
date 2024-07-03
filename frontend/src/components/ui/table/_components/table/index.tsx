import { AgGridReact } from "ag-grid-react";
import { TableComponentType } from "@/types/components/table";
import Loader from "@/components/ui/loader";

const TableComponent = ({ rowData, columnDefs, isFetching }: TableComponentType) => {
  return (
    <div className="table-container ag-theme-alpine">
      {!isFetching ? (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TableComponent;
