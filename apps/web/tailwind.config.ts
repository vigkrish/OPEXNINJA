import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { primary: '#0B1F3A', secondary: '#1E88E5', accent: '#FF6B00', neutral: '#334155' },
      fontFamily: { sans: ['Poppins', ...defaultTheme.fontFamily.sans], inter: ['Inter', ...defaultTheme.fontFamily.sans] },
    },
  },
  plugins: [animate],
};
export default config;
