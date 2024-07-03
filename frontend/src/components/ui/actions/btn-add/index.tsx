import { Button } from "antd";
import { ButtonType } from "@/types/components/actions";

const ButtonAdd = ({ onClick }: ButtonType) => {
  return (
    <Button type={"primary"} onClick={onClick}>
      Добавить
    </Button>
  );
};

export default ButtonAdd;
