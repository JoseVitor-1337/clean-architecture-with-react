module.exports = {
  roots: ["<rootDir>/src"],
  collectionCoverageFrom: ["<rootDir>/src/**/*.{ts, tsx}"],
  coverageDirectory: "coverage",
  testEnvironmet: "node",
  transform: {
    ".*\\.ts$": "ts-jest",
  },
};
