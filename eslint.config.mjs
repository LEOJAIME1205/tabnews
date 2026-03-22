import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: [".next/", "node_modules/"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ["pages/**/*.{js,jsx}", "components/**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    ...jest.configs["flat/recommended"],
    files: ["**/*.test.js", "**/*.spec.js", "**/tests/**/*.js"],
  },
  nextPlugin.configs["core-web-vitals"],
  {
    rules: prettier.rules,
  },
];
