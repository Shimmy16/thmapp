import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
const button = cva(
 "inline-flex items-center justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
 {
   variants: {
     variant: {
       primary:   "bg-mertens-accent text-white hover:bg-mertens-brand",
       secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
       ghost:     "bg-transparent hover:bg-gray-50"
     },
     size: {
       sm: "h-8 px-3 text-sm",
       md: "h-10 px-4",
       lg: "h-12 px-6"
     }
   },
   defaultVariants: { variant: "primary", size: "md" }
 }
);
type ButtonProps =
 React.ButtonHTMLAttributes<HTMLButtonElement> &
 VariantProps<typeof button>;
export const Button: React.FC<ButtonProps> = ({ className, variant, size, ...props }) => (
<button className={clsx(button({ variant, size }), className)} {...props} />
);