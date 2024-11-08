const TextareaField = ({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  inputType,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="font-semibold ">{label ?? ""}</label>
      <textarea
        name={name ?? ""}
        defaultValue={defaultValue ?? ""}
        required={required ?? true}
        placeholder={placeholder ?? ""}
        type={inputType ?? "text"}
        className="input-style"
      />
    </div>
  );
};

export default TextareaField;
