/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#C84B26', // Terracotta / warm copper
          hover: '#B03C19',
          light: '#FDF4F0',
          dark: '#E8613A',
          'dark-hover': '#F07552',
        },
        surface: {
          light: {
            bg: '#FAF9F6',
            card: '#FFFFFF',
            muted: '#F3F1EC',
            border: '#E4E2DA',
            text: '#141414',
            subtext: '#5E5D57',
          },
          dark: {
            bg: '#111112',
            card: '#18181A',
            muted: '#202023',
            border: '#27272B',
            text: '#EDEDEE',
            subtext: '#929299',
          }
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        editorial: '-0.025em',
      }
    },
  },
  plugins: [],
}
