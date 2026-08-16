/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'oklch(0.9369 0.0124 91.5)',
        'surface': 'oklch(0.9942 0.0069 88.6)',
        'fg': 'oklch(0.2170 0.0038 106.7)',
        'ink': 'oklch(0.16 0.01 95)',
        'accent': 'oklch(0.7389 0.1348 59.6)',
        'brick': 'oklch(0.405 0.13 32)',
        'terracotta': 'oklch(0.65 0.11 47)',
        'mustard': 'oklch(0.82 0.14 87)',
        'blue': 'oklch(0.53 0.13 247)',
        'strawberry': 'oklch(0.48 0.15 20)',
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
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
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
