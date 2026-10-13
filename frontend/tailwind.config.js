/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        primary: '#1D4ED8',  
        secondary: '#F3F4F6', 
      },
      boxShadow: {
        'nav': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        sm: '4px',
      },
    },
  },
  plugins: [],
}
