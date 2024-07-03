import { Dispatch, SetStateAction } from "react";
import { Select } from "antd";
import { optionsForLimit } from "@/constants";
import "@/components/ui/toggle-limit/toggle-limit.scss";

const ToggleLimit = ({ setLimit }: { setLimit: Dispatch<SetStateAction<number>> }) => {
  return (
    <label className="toggle-limit">
      Выберите отображаемое количество строк
      <Select defaultValue={10} onChange={(e) => setLimit(e)} options={optionsForLimit} />
    </label>
  );
};

export default ToggleLimit;
