/* eslint-disable */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/testHelper/setupTests.js",
    "<rootDir>/@types/miro.d.ts",
    "<rootDir>/@types/miroGlobal.d.ts",
    "<rootDir>/@types/global.d.ts",
  ],
  testMatch: ["**/?(*.)+(spec|test).(ts|tsx)"],
  moduleNameMapper: {
    "(.*).svg.?raw$": "<rootDir>/testHelper/mockSvg.js",
  },
  preset: "ts-jest",
  transform: {
    //https://github.com/kulshekhar/ts-jest/issues/937
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};

module.exports = config;
// SDK: {
//   IRect: {},
// },
