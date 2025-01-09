const FormField = ({
  label,
  name,
  required,
  placeholder,
  inputType,
  disabled,
  setValue,
  defaultValue,
  rightContent,
  value,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col md:flex-row justify-between">
        <label className="font-semibold ">{label ?? ""}</label>
        <div>{rightContent}</div>
      </div>
      <input
        name={name ?? ""}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        defaultValue={defaultValue}
        value={value ?? null}
        disabled={disabled ?? false}
        required={required ?? true}
        placeholder={placeholder ?? ""}
        type={inputType ?? "text"}
        className="input-style"
      />
    </div>
  );
};

export default FormField;
