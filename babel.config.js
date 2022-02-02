/* eslint-disable */

// Babel is used for TypeScript Support in Jest
// see:
// - https://jestjs.io/docs/getting-started#using-babel
// - https://jestjs.io/docs/getting-started#using-typescript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
};
