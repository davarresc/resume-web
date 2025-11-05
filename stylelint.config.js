/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html",
    "stylelint-config-astro",
  ],
  overrides: [
    {
      files: ["**/*.{astro,html}"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: ["**/dist/**", "**/node_modules/**"],
};
