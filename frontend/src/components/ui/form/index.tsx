import { FormType } from "@/types/components/form";
import "@/components/ui/form/form.scss";

const Form = ({ handleSubmit, children }: FormType) => {
  return (
    <form onSubmit={handleSubmit} className={"form"}>
      {children}
    </form>
  );
};

export default Form;
