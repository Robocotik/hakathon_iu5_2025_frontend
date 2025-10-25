interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Input = ({ name, value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700/50 border border-gray-600/30 rounded px-4 py-3 text-white text-sm"
      placeholder={placeholder}
    />
  );
};