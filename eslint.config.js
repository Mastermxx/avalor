import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist", "node_modules"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser, // Add browser globals (e.g., `window`, `document`)
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Enable TypeScript rules
    },
    rules: {
      "no-unused-vars": "off", // Disable the default rule
      "@typescript-eslint/no-unused-vars": [
        "warn", // Enable the TypeScript-specific rule
        {
          vars: "all", // Check all variables
          args: "after-used", // Allow unused function args if they're before used ones
          ignoreRestSiblings: true, // Ignore unused variables in object destructuring
        },
      ],
    },
  },
];
