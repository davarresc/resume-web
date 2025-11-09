import { getPathInfo, switchLangHref } from "../i18n/config.ts";
import { SETTINGS_ACTION_TYPES } from "../types/Settings.ts";
import type { SharedWorkerGlobalScope } from "../types/SharedWorkerGlobalScope";
import { setTheme } from "./settings.ts";

/**
 * Initializes the SharedWorker instance.
 *
 * @returns {SharedWorker}
 */
export function initializeSharedWorker(): SharedWorker | null {
  const ctx = globalThis as unknown as SharedWorkerGlobalScope;
  const url = new URL("/js/workers/shared.js", import.meta.url);

  if (typeof ctx === "undefined" || !("SharedWorker" in ctx)) return null;

  ctx.__sharedWorker = new SharedWorker(url, { type: "module" });
  ctx.__sharedWorker.port.start();

  if (ctx.__sharedWorker) {
    ctx.__sharedWorker.port.onmessage = (e) => {
      processMessage(e);
    };
  }

  return ctx.__sharedWorker;
}

/**
 * Processes incoming messages from the SharedWorker.
 *
 * @param {MessageEvent} e
 */
function processMessage(e: MessageEvent) {
  switch (e.data?.type) {
    case SETTINGS_ACTION_TYPES.SET_THEME:
      setTheme(e.data.value);
      break;
    case SETTINGS_ACTION_TYPES.SET_LANGUAGE: {
      globalThis.location.href = switchLangHref(
        getPathInfo(globalThis.location.pathname),
        e.data.value,
      );
      break;
    }
    default:
      console.warn("Unknown message from SharedWorker:", e.data);
  }
}

/**
 * Gets the SharedWorker instance, initializing it if necessary.
 *
 * @returns {SharedWorker | null}
 */
export function getSharedWorker(): SharedWorker | null {
  const ctx = globalThis as unknown as SharedWorkerGlobalScope;

  if (typeof ctx === "undefined" || !("SharedWorker" in ctx)) return null;

  return ctx.__sharedWorker || null;
}

/**
 * Sends a message to the SharedWorker.
 *
 * @param { type: string; value: unknown } message
 */
export function postMessageToWorker(message: { type: string; value: unknown }) {
  const sharedWoker = getSharedWorker();
  if (sharedWoker) {
    sharedWoker.port.postMessage(message);
  }
}
