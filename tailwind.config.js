module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.{js,jsx,ts,tsx}',
    './app/javascript/**/**/*.{js,jsx,ts,tsx}',
    './app/javascript/**/**/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
  theme: {
    fontSize: {
      'xs': '0.75rem', // 12px
      'sm': '0.875rem', // 14px
      'base': '1rem', // 16px
      'lg': '1.125rem', // 18px
      'xl': '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      'small': '0.75rem', // 12px
    },
    extend: {
      screens: {
        'custom': '1100px'
      },
      fontFamily: {
        'fontcourier': ['Courier New', 'monospace'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      colors: {
        editor: {
          bg: '#2b2b2b',
          toolbar: '#474a4d',
          button: '#bbbcde',
          buttonHover: '#555555',
        },
      },
    }
  }
}