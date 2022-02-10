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
        sidebarApp: path.resolve(__dirname, "src/SidebarApp/SidebarApp.html"),
        app: path.resolve(__dirname, "src/ImportProtocol/ImportProtocol.html"),
      },
    },
  },
  server: {
    https: true,
  },
  plugins: [mkcert(), reactRefresh()],
});
