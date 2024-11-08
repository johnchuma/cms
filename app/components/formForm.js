const FormField = ({
  label,
  name,
  required,
  placeholder,
  inputType,
  setValue,
  defaultValue,
  value,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="font-semibold ">{label ?? ""}</label>
      <input
        name={name ?? ""}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        defaultValue={defaultValue}
        value={value ?? null}
        required={required ?? true}
        placeholder={placeholder ?? ""}
        type={inputType ?? "text"}
        className="input-style"
      />
    </div>
  );
};

export default FormField;
