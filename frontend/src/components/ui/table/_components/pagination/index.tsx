import ToggleLimit from "@/components/ui/toggle-limit";
import { Pagination } from "antd";
import { TablePaginationType } from "@/types/components/table";

const TablePagination = ({ setPage, currentPage, total, limit, setLimit }: TablePaginationType) => {
  return (
    <div className="table-pagination">
      <ToggleLimit setLimit={setLimit} />
      {limit < total && (
        <span className="table-pagination__count">
          {limit} из {total}
        </span>
      )}
      <Pagination current={currentPage} onChange={setPage} pageSize={limit} total={total} />
    </div>
  );
};

export default TablePagination;
