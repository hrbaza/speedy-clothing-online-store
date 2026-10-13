/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Taken from the Speed Clothing logo (#0037F4)
        brand: {
          50: '#eef3ff',
          100: '#dce5ff',
          200: '#bfcfff',
          300: '#93acff',
          400: '#5f80ff',
          500: '#2f57ff',
          600: '#0037f4',
          700: '#002bc4',
          800: '#00239c',
          900: '#001a73',
          950: '#000f45',
        },
        ink: {
          DEFAULT: '#0a0b10',
          900: '#0a0b10',
          800: '#11131b',
          700: '#1a1d29',
          600: '#272b3b',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Outfit', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(10, 11, 16, 0.15)',
        glow: '0 20px 60px -15px rgba(0, 55, 244, 0.55)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'spin-slow': 'spin 18s linear infinite',
      },
    },
  },
  plugins: [],
}
