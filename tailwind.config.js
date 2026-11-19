/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0b1a12',
          900: '#12261a',
          800: '#1b3a27',
          700: '#275137',
          600: '#386b48',
          500: '#50845c'
        },
        navy: {
          950: '#101c2b',
          900: '#14263d',
          800: '#1c3754',
          600: '#2c547c'
        },
        sand: {
          50: '#fbfaf6',
          100: '#f3efe6',
          200: '#e6ded0',
          300: '#d2c4ab',
          400: '#b8a47f'
        },
        gold: {
          400: '#cbb98f',
          500: '#b49f70',
          600: '#8c7850'
        },
        charcoal: '#242a26',
        ivory: '#fcfbf7'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        accent: ['Fraunces', 'Georgia', 'serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        editorial: '0.18em',
        wide2: '0.3em'
      },
      maxWidth: {
        editorial: '86rem'
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(2.5rem, -0.75rem, 0)' }
        },
        scrollPulse: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.45' },
          '50%': { transform: 'translateY(7px)', opacity: '1' }
        }
      },
      animation: {
        drift: 'drift 16s ease-in-out infinite',
        'scroll-pulse': 'scrollPulse 1.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
