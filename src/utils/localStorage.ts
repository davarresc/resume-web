import { DEFAULT_SETTINGS, type Settings } from "../types/Settings";

const STORAGE_SETTING_KEY = "settings";

export const getSettings = (): Settings => {
  let settings: Settings = DEFAULT_SETTINGS;

  try {
    settings = JSON.parse(localStorage.getItem(STORAGE_SETTING_KEY) || "{}");
  } catch {
    // ignore
  }

  return settings;
};

export const setSettings = (settings: Settings): void => {
  localStorage.setItem(STORAGE_SETTING_KEY, JSON.stringify(settings));
};
