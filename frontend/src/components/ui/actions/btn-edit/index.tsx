import { ButtonType } from "@/types/components/actions";
import { Button } from "antd";

const ButtonEdit = ({ onClick }: ButtonType) => {
  return (
    <Button type={"primary"} onClick={onClick}>
      Редактировать
    </Button>
  );
};

export default ButtonEdit;
