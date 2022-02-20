type PropsTypeInput = {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: PropsTypeInput) => {
  let { label, placeholder, name, type, value, onChange } = props;
  return (
    <div className="form-group flex flex-col space-y-2 w-2/4 mb-4">
      <label htmlFor={name} className="text-black">
        {label}
      </label>
      <input
        onChange={onChange || (() => {})}
        value={value || ""}
        className="form-input border border-gray-200 rounded-xl px-2 py-3"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
