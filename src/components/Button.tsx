import clx from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button = ({ title, variant = 'primary', isLoading = false, isDisabled = false, ...rest }: ButtonProps) => {
  return (
    <button
      type="submit"
      name={title.toLowerCase()}
      disabled={isDisabled || isLoading}
      className={clx("w-full flex h-14 justify-center items-center px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed", { "bg-gray-200 text-black focus:ring-gray-200 hover:bg-gray-300": variant == "secondary" })}
      {...rest}
    >
      {isLoading ? "Loading..." : title}
    </button>
  );
};

export default Button;
