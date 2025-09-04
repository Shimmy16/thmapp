
import clsx from 'clsx';


type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
// Wiederverwendbare Input-Komponente
export const Input = ({ className, ...props }: InputProps) => (
<input

    className={clsx(

      'w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50',

      className

    )}

    {...props}

  />

);
 