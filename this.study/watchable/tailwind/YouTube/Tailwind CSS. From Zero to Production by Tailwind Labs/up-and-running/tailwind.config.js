// Stand-alone commands used in this project:
//   Install Tailwind CSS along with it's dependencies and a build tool.
//     npm i -D postcss tailwindcss autoprefixer vite
//   Generate tailwind config file (-p also generate postcss config and use tailwind as a postcss plugin):
//     npx tailwindcss init -p
//   Manually build CSS file (-i input, -o output):
//     npx tailwindcss -i css/tailwind.css -o build/tailwind.css [--watch]
//   Generate tailwind config file that explicitly includes all implicit config (not recommended):
//     npx tailwindcss init tailwind-full.config.js --full

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {}
  },
  plugins: []
};
