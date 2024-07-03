import { Input } from "antd";
import { SearchType } from "@/types/components/search";
import "@/components/ui/search/search.scss";

const Search = ({ name, value, placeholder, onChange }: SearchType) => {
  return (
    <label htmlFor={name} className={"search"}>
      <Input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        size={"small"}
      />
    </label>
  );
};

export default Search;
