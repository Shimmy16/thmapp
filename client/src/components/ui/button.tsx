import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
// Button-Styles mit class-variance-authority (CVA)
// Ermöglicht kombinierbare Variants (z. B. variant="primary" size="lg")
const button = cva(
 "inline-flex items-center justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
 {
   variants: {
    // Button-Farben / Typen
     variant: {
       primary:   "bg-mertens-accent text-white hover:bg-mertens-brand",
       secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
       ghost:     "bg-transparent hover:bg-gray-50"
     },
    // Grössenvarianten
     size: {
       sm: "h-8 px-3 text-sm",
       md: "h-10 px-4",
       lg: "h-12 px-6"
     }
   },
   defaultVariants: { variant: "primary", size: "md" } // Default-Variant, falls nichts angegeben ist
 }
);
// Props = normale Button-Props + CVA-Varianten
type ButtonProps =
 React.ButtonHTMLAttributes<HTMLButtonElement> &
 VariantProps<typeof button>;
 // Button-Komponente
export const Button: React.FC<ButtonProps> = ({ className, variant, size, ...props }) => (
<button className={clsx(button({ variant, size }), className)} {...props} />
);