export const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-neutral-300 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="text-neutral-500" size={16} />
      </span>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none transition-all"
      />
    </div>
  </div>
);
