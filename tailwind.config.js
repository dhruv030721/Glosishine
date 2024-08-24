  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'poppins': ['Poppins'],
          'dm-sans': ['DM Sans', 'sans-serif'],
          'merriweather-sans': ['Merriweather Sans', 'sans-serif'],
          'shippori-antique': ['Shippori Antique', 'serif'],
          'lexendDeca': ['Lexend Deca'],
          'montserrat':['Montserrat'],
          'jost':['Jost'],
          'outfit':['Outfit'],
        },
        colors: {
          'primary': '#9C9C9C',
          'palette':'#33B786',
          'secondary': '#1B1B1B',
          'bg-primary': '#080808',
          'bg-dark':'#  8D8D8D',
          'color-yellow':'#ca8a04',
        },
  
      },
    },
    plugins: [],
  }