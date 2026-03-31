module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "src/components/ui/PhoneNumber/assets/flags/*",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/ban-ts-comment": "warn", // Add this line
    "react-hooks/exhaustive-deps": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "react/no-array-index-key": 1,
    "react/button-has-type": [
      2,
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],
    "react/prop-types": [2, { skipUndeclared: true }],
    "@typescript-eslint/no-unused-vars": ["off"],
  },
};
