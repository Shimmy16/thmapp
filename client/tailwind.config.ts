// tailwind.config.ts
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const config: Config = {
 content: ['./index.html', './src/**/*.{ts,tsx}'],
 theme: {
   extend: {
     colors: {
       'mertens-brand': '#0A66C2',
       'mertens-accent': '#FF6B00',
     },
     fontFamily: {
       sans: [...defaultTheme.fontFamily.sans],
     },
   },
 },
 plugins: [forms],
};
export default config;