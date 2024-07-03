import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { ChangeEvent, ReactElement } from "react";
import { Input } from "antd";
import "@/components/ui/controlled-input/controlled-input.scss";
import TextArea from "antd/es/input/TextArea";

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  onChange,
  label,
  placeholder,
  rules = { required: { value: false, message: "" } },
  disabled = false,
  isVisible = true,
  type = "text",
}: {
  control: Control<T>;
  name: Path<T>;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  placeholder: string;
  disabled?: boolean;
  rules?: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
  isVisible?: boolean;
  type?: "text" | "password" | "email" | "textarea";
}): ReactElement => {
  return (
    <>
      {isVisible && (
        <>
          <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field, fieldState }) => {
              const values = field.value ? field.value : "";

              const isRequired =
                rules && rules.required && rules.required instanceof Object && rules.required?.value ? "*" : "";

              const { error = { message: "", type: "" } } = fieldState;

              return (
                <div className="input">
                  {type === "textarea" ? (
                    <label htmlFor={field.name}>
                      {label} {isRequired}
                      <TextArea
                        id={field.name}
                        value={values}
                        placeholder={placeholder}
                        name={field.name}
                        onChange={(e): void => {
                          field.onChange(e.currentTarget.value);
                          onChange && onChange(e);
                        }}
                        disabled={disabled}
                      />
                    </label>
                  ) : (
                    <label htmlFor={field.name}>
                      {label} {isRequired}
                      <Input
                        id={field.name}
                        value={values}
                        placeholder={placeholder}
                        name={field.name}
                        onChange={(e): void => {
                          field.onChange(e.currentTarget.value);
                          onChange && onChange(e);
                        }}
                        disabled={disabled}
                        type={type}
                      />
                    </label>
                  )}
                  {error && error.message && <span className="error_message">{error.message}</span>}
                </div>
              );
            }}
          />
        </>
      )}
    </>
  );
};

export default ControlledInput;
