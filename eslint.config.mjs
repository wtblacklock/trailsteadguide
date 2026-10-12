import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    // Escalated from the next/core-web-vitals default (warn) to error so a
    // future <img>/<Image> missing alt text fails the build instead of
    // silently regressing. Existing product-thumbnail images intentionally
    // use alt="" (the product name is always rendered as adjacent text), which
    // this rule already treats as a satisfied, deliberate decorative image.
    rules: {
      "jsx-a11y/alt-text": "error",
    },
  },
];

export default eslintConfig;
