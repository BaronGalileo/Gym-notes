import { createDefaultPreset } from "ts-jest";

const defaultPreset = createDefaultPreset();

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  ...defaultPreset,
  verbose: true,

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
        },
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },

  moduleNameMapper: {
    "\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
