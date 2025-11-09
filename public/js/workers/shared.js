const SETTINGS_ACTION_TYPES = {
  SET_THEME: "set-theme",
  SET_LANGUAGE: "set-language",
};
const ctx = globalThis;
const browserInstances = [];

const TYPES = SETTINGS_ACTION_TYPES;

ctx.onconnect = (e) => {
  const tab = e.ports[0];
  browserInstances.push(tab);

  tab.onmessage = (event) => {
    // Only process known action types
    if (Object.values(TYPES).includes(event.data?.type)) {
      broadcast(event.data, tab);
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
function broadcast(data, except) {
  browserInstances.forEach((instance) => {
    if (instance !== except) {
      instance.postMessage(data);
    }
  });
}
