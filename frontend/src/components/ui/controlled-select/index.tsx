import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { ReactElement } from "react";
import { Select } from "antd";
import "@/components/ui/controlled-select/controlled-select.scss";

const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  value,
  options = [],
  onChange,
  label,
  placeholder,
  className,
  rules,
  isVisible = true,
  dataCy,
  showSearch = false,
  onSearch,
}: {
  control: Control<T>;
  name: Path<T>;
  value?: string;
  options: {
    value: string | null | undefined;
    label: string;
  }[];
  onChange?: (value: string | null | undefined, name: string) => void;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  iconDirect?: "right" | "left" | "top" | "bottom";
  rules?: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
  isVisible?: boolean;
  dataCy?: boolean;
  searchValue?: string;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
}): ReactElement => {
  return (
    <>
      {isVisible ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => {
            const { value: fieldValue } = field;

            const values = fieldValue ? fieldValue : value;

            const isRequired =
              rules && rules.required && rules.required instanceof Object && rules.required?.value ? "*" : "";

            const { error = { message: "", type: "" } } = fieldState;

            return (
              <div className="select" data-cy={dataCy ? dataCy : name}>
                <label htmlFor={name}>
                  {label} {isRequired}
                  <Select
                    filterOption={false}
                    showSearch={showSearch}
                    id={name}
                    data-cy={dataCy ? dataCy : name}
                    className={className}
                    options={options}
                    placeholder={placeholder}
                    value={values}
                    onSearch={onSearch}
                    onChange={(value): void => {
                      field.onChange(value);
                      onChange && onChange(value, name);
                    }}
                  />
                </label>

                {error && error.message && <span className="error_message">{error.message}</span>}
              </div>
            );
          }}
        />
      ) : null}
    </>
  );
};

export default ControlledSelect;
