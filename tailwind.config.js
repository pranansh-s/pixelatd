const { scale } = require("tailwindcss/defaultTheme")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F1F1F',
        secondary: '#CD4C03',
        accent: '#737267',
        textC: '#FFFFFF'
      },
      fontFamily: {
        "Francois": ['Francois One', ...defaultTheme.fontFamily.sans],
        "Hind": ['Hind Madurai', ...defaultTheme.fontFamily.sans],
        "Gidugu": ['Gidugu', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'size': 'size 0.1s ease-out'
      },
      keyframes: {
        'size': {          
          '50%': { transform: 'scale(1.1)' },
        }
      }
    }
  },
  plugins: [],
}
