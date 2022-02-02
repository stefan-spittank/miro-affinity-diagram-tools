/* eslint-disable */

const config = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
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
