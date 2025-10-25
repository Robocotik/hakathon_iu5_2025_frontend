interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

export const Input = ({ name, value, onChange, placeholder, className = '' }: InputProps) => {
  return (
    <input
      type='text'
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full bg-gray-700/50 border border-gray-600/30 rounded px-3 py-2 text-white text-sm placeholder:text-gray-400
                 autofill:bg-gray-700/50 autofill:text-white
                 focus:outline-none focus:border-blue-500 ${className}`}
      placeholder={placeholder}
    />
  );
};
