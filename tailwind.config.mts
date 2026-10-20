import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sabbia: '#fcf7ec',
        ponza: {
          50: '#e8f4f8',
          100: '#c5e4ef',
          200: '#9acee0',
          300: '#6ab4ce',
          400: '#3d9bbd',
          500: '#1a7fa3',
          600: '#156683',
          700: '#104d64',
          800: '#0b3546',
          900: '#051e29',
        },
        tufo: {
          50: '#fdf8f0',
          100: '#f9edd9',
          200: '#f0d9b0',
          300: '#e4c285',
          400: '#d4a85c',
          500: '#c48f3a',
          600: '#a3732e',
          700: '#7d5824',
          800: '#583f1b',
          900: '#332512',
        },
        corallo: '#E07A5F',
        crema: '#f5ede1',
        notte: '#0b3546',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Rubik', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
