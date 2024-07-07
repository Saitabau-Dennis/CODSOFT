module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        purple: {
          600: '#7C3AED',
        },
        pink: {
          500: '#EC4899',
          600: '#DB2777',
        },
        yellow: {
          500: '#F59E0B',
          600: '#D97706',
        },
        red: {
          500: '#EF4444',
        },
      },
    },
  },
  plugins: [],
};