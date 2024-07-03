import { ModalDeleteType } from "@/types/components/modal";
import FormButtons from "@/components/ui/form/form-buttons";
import Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UserAddType } from "@/types/actions/users";
import Title from "antd/lib/typography/Title";

const ModalDelete = ({ onClose, onDelete, id, name }: ModalDeleteType) => {
  const { handleSubmit } = useForm<UserAddType>({
    mode: "all",
    delayError: 200,
    reValidateMode: "onBlur",
  });

  return (
    <Form handleSubmit={handleSubmit(() => onDelete(id))}>
      <Title level={3}>{name}</Title>
      <FormButtons label={"Удалить"} disabled={!id} onClose={onClose} />
    </Form>
  );
};

export default ModalDelete;
