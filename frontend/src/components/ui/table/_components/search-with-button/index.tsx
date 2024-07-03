import Search from "@/components/ui/search";
import ButtonAdd from "@/components/ui/actions/btn-add";
import { TableSearchWithButtonType } from "@/types/components/table";

const TableSearchWithButton = ({ search, setSearch, searchPlaceholder, handleModal }: TableSearchWithButtonType) => {
  return (
    <div className="table-search">
      <Search name={"search"} value={search} placeholder={searchPlaceholder} onChange={setSearch} />
      <ButtonAdd onClick={handleModal} />
    </div>
  );
};

export default TableSearchWithButton;
