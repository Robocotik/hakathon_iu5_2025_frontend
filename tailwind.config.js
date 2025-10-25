/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Переносим CSS переменные в конфигурацию Tailwind
        gray: '#1e293b',
        'gray-light': '#64748b',
        'gray-text': '#cbd5e1',
        'gray-dark': '#0f172a',
        'blue-light': '#60a5fa',
        'blue-dark': '#1e40af',
        'purple-light': '#a855f7',
        'purple-dark': '#7c3aed',
        'green-light': '#4ade80',
        'red-light': '#f87171',
        'yellow-light': '#fbbf24',
        'orange-light': '#fb923c',
        'pink-light': '#f472b6',
        'indigo-light': '#818cf8',
        'cyan-light': '#67e8f9',
        'violet-light': '#a78bfa',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        popup: 'fadeInScale 0.15s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        glow: {
          '0%': {
            boxShadow:
              '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)',
          },
          '100%': {
            boxShadow:
              '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)',
          },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-underline': '0 2px 10px rgba(59, 130, 246, 0.3)',
        'glow-sm': '0 0 5px rgba(59, 130, 246, 0.5)',
        'glow-md': '0 0 10px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
