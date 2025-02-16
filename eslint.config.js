import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    settings: { react: { version: "18.3" } },
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: [
          "./tsconfig.node.json",
          "./tsconfig.app.json",
          "./tsconfig.storybook.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // Causes an error:
      // RangeError: Maximum call stack size exceeded
      // Occurred while linting /Users/yona/dev/personal/zipper_wizard/src/data/step-builder.ts:3
      // Rule: "@typescript-eslint/no-unnecessary-type-parameters"
      //   at getIndexedAccessTypeOrUndefined (/Users/yona/dev/personal/zipper_wizard/node_modules/typescript/lib/typescript.js:65602:43)
      //   at getIndexedAccessType (/Users/yona/dev/personal/zipper_wizard/node_modules/typescript/lib/typescript.js:65588:12)

      "@typescript-eslint/no-unnecessary-type-parameters": "off",
    },
  },
);
