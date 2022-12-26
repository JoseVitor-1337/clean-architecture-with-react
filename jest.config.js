const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts, tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".*\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
};
