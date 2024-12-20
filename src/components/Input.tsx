interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={label.toLowerCase()}
        className="mt-1 block w-full h-14 px-4 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
        id={label.toLowerCase()}
        {...rest}
      />
    </div>
  );
};

export default Input;
