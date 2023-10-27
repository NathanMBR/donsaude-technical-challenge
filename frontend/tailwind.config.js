/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D0005E',
          light: '#FFF0F7',
          hover: '#A70E53'
        },
        system: {
          success: '#C2ED79'
        },
        layout: {
          background: '#F2F4F7',
          button: {
            hover: {
              text: '#A70E53',
              background: '#EAECF0'
            }
          }
        },
        typography: {
          DEFAULT: '#101828',
          dimmed: '#7A7E87'
        },
        form: {
          label: '#475467',
          field: '#667085',
          border: '#D0D5DD'
        },
      },

      borderWidth: {
        DEFAULT: '1.5px',
      }
    },
  },
  plugins: [],
}

