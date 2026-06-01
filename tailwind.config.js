/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,css}"],
  theme: {
    extend: {
      colors: {
        lasa: {
          50: '#F7F8F4',
          100: '#EEF2EA',
          200: '#D9E4D5',
          300: '#B9C8B0',
          400: '#86A07D',
          500: '#4F7A6A',
          600: '#2E5A52',
          700: '#1E3A34',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
