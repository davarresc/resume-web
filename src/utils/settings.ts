import type { Theme } from "../types/Settings";

/**
 * Sets the application's theme by updating the document's data-theme attribute.
 *
 * @param {Theme} theme
 */
export const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};
