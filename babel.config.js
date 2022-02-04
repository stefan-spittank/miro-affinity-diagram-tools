/* eslint-disable */

// Babel is used for TypeScript Support in Jest
// see:
// - https://jestjs.io/docs/getting-started#using-babel
// - https://jestjs.io/docs/getting-started#using-typescript

// "babel-preset-vite" ist used to workaround vite using import.meta.env to pass env variables
// see: https://www.npmjs.com/package/babel-preset-vite
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react",
    "babel-preset-vite",
  ],
};
