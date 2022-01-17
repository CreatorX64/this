module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Kaushan Script", "cursive"]
      },
      colors: {
        green: {
          DEFAULT: "#00f260"
        },
        dark: {
          DEFAULT: "#010101",
          100: "#0a0b0e",
          200: "#16181d",
          300: "#16181d",
          500: "#0f1115",
          700: "#202125"
        }
      },
      boxShadow: {
        "custom-light": "0 0 10px #313131",
        "custom-dark": "5px 5px 10px #0a0c0e, -5px -5px 10px #14161c"
      },
      gridTemplateColumns: {
        layout: "250px 1fr"
      }
    }
  },
  plugins: []
};
