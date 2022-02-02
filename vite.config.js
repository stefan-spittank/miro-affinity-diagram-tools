/* eslint-disable */

const path = require("path");
const { defineConfig } = require("vite");
const mkcert = require("vite-plugin-mkcert").default;
const reactRefresh = require("@vitejs/plugin-react-refresh");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        app: path.resolve(__dirname, "app.html"),
        sidebar: path.resolve(__dirname, "sidebar.html"),
      },
    },
  },
  server: {
    https: true,
  },
  plugins: [mkcert(), reactRefresh()],
});
