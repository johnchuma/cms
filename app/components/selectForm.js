const SelectField = ({
  label,
  name,
  required,
  setValue,
  showNullOption = true,
  items = [],
  values = [],
  defaultValue,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="font-semibold ">{label ?? ""}</label>
      <select
        name={name ?? ""}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        required={required ?? true}
        className="input-style"
      >
        {showNullOption && <option>Select Item</option>}
        {items.map((item, index) => {
          return (
            <option key={item} value={values.length > 0 ? values[index] : item}>
              {item}
            </option>
          );
        })}
        <option></option>
      </select>
    </div>
  );
};

export default SelectField;
