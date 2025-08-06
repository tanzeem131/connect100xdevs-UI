export const Textarea = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-neutral-300 mb-1"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="3"
      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none transition-all"
    />
  </div>
);
