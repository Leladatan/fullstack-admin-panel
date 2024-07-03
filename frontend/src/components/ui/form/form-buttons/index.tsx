import { Button } from "antd";
import { FormButtonsType } from "@/types/components/form";
import "@/components/ui/form/form-buttons/form-buttons.scss";

const FormButtons = ({ label, disabled, onClose }: FormButtonsType) => {
  return (
    <div className={"form-buttons"}>
      <Button disabled={disabled} htmlType={"submit"} type={"primary"}>
        {label}
      </Button>
      <Button htmlType={"button"} onClick={onClose}>
        Отмена
      </Button>
    </div>
  );
};

export default FormButtons;
