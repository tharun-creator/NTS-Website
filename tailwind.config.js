/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F4ECDF',
        'maroon': '#4A151C',
        'bg-deep': '#150A09',
        'bg-maroon': '#2C0F14',
        'gold': '#C9A15A',
        'gold-soft': '#E3C98F',
        'muted': '#A8968A',
        'coral-orange': '#E9542E',
        'hot-pink': '#F4A6C8',
        'deep-navy': '#1B2E33',
        'tropical-yellow-green': '#C9C948',
        'berry-purple': '#3A2246',
        'copper-brown': '#7A4A2E',
        'sage-green': '#8FA66B',
        'sky-blue': '#5FB8D9',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
        lora: ['"Lora"', 'serif'],
        rye: ['"Rye"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
        gasoek: ['"Gasoek One"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
