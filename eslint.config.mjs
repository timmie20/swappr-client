import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // "no-console": "warn",
      // "no-unused-vars": "warn",
      "no-undef": "error",
      "no-constant-condition": "warn",
      "no-empty": "warn",
      "no-irregular-whitespace": "warn",
      "no-unreachable": "warn",
      "no-unsafe-finally": "warn",
      "no-unsafe-negation": "warn",
      "no-unsafe-optional-chaining": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  }),
];

export default eslintConfig;
