import { Button } from "antd";
import { ButtonType } from "@/types/components/actions";

const ButtonDelete = ({ onClick }: ButtonType) => {
  return (
    <Button type={"primary"} onClick={onClick}>
      Удалить
    </Button>
  );
};

export default ButtonDelete;
