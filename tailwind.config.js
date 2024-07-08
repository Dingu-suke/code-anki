module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    "./node_modules/@blocknote/shadcn/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [require("daisyui")],
  theme: {
    fontsize: {
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
      }
    }
  }
}
