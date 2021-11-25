// Stand-alone commands used in this project:
//   Manually build CSS file (-i input, -o output):
//     npx tailwindcss-cli build -i css/tailwind.css -o build/tailwind.css
//   Generate tailwind config file (-p also generate postcss config and use tailwind as a postcss plugin):
//     npx tailwindcss init -p
//   Generate tailwind config file that explicitly includes all implicit config (not recommended):
//     npx tailwindcss init tailwind-full.config.js --full

// Note on PurgeCSS: PurgeCSS will only run if NODE_ENV is set to "production".
// Though we don't explicitly do that in our package.json file because running
// "vite build" command automatically adds that environment variable. Alternatively,
// you can define the "purge" property below as an object and specify when it should run.

module.exports = {
  // purge: ["./src/**/*.jsx"],
  purge: {
    // enabled: false, // Never run PurgeCSS
    // enabled: true, // Always run PurgeCSS (even in prod). This can slow down dev process
    content: ["./src/**/*.jsx"],
    options: {
      // Pass options directly to PurgeCSS (https://purgecss.com/configuration.html#options)
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // brand: "#0fa9e6",
        // "brand-light": "#3fbaeb",
        // "brand-dark": "#0c87b8"

        brand: {
          DEFAULT: "#0fa9e6",
          light: "#3fbaeb",
          dark: "#0c87b8"
        }
      },
      fontFamily: {
        headline: "Poppins, sans-serif"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"]
    }
  },
  plugins: []
};
