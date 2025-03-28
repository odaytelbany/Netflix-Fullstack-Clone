import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/*.{js,ts,jsx,tsx}', './src/**/**/*.{js,ts,jsx,tsx}'], // Adjust if needed
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-scrollbar-hide')], // Add the plugin here
};

export default config;
