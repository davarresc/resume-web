export type Theme = "light" | "dark";

export type Settings = {
  theme: Theme;
};

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
};

export const SETTINGS_ACTION_TYPES = {
  SET_THEME: "set-theme",
  SET_LANGUAGE: "set-language",
} as const;
