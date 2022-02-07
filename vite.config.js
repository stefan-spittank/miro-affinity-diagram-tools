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
        overview: path.resolve(__dirname, "src/Overview/Overview.html"),
        app: path.resolve(__dirname, "src/ImportProtocol/ImportProtocol.html"),
        sidebar: path.resolve(
          __dirname,
          "src/ShowProtocolReference/ShowProtocolReference.html"
        ),
      },
    },
  },
  server: {
    https: true,
  },
  plugins: [mkcert(), reactRefresh()],
});
