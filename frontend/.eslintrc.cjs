module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "@typescript-eslint/no-namespace": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "crlf",
        singleQuote: false,
        trailingComma: "all"
      }
    ]
  }
};

