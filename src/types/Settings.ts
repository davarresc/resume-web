export type Theme = "light" | "dark";

export type Settings = {
  theme: Theme;
};

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
};
