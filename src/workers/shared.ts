import { SETTINGS_ACTION_TYPES } from "../types/Settings";
import type { SharedWorkerGlobalScope } from "../types/SharedWorkerGlobalScope";

const ctx = globalThis as unknown as SharedWorkerGlobalScope;
const browserInstances: MessagePort[] = [];

const TYPES = SETTINGS_ACTION_TYPES;

ctx.onconnect = (e: MessageEvent) => {
  const tab = e.ports[0];
  browserInstances.push(tab);

  tab.onmessage = (event) => {
    // Only process known action types
    if (Object.values(TYPES).includes(event.data?.type)) {
      broadcast(event.data, tab);
    } else {
      console.warn("Unknown action:", event.data);
    }
  };
};

/**
 *
 * Broadcasts a message to all connected browser instances, except the specified one.
 *
 * @param data
 * @param {MessagePort} except
 */
function broadcast(data: unknown, except?: MessagePort) {
  browserInstances.forEach((instance) => {
    if (instance !== except) {
      instance.postMessage(data);
    }
  });
}
