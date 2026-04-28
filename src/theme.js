let callback = null;
const localStorageItem = "theme";
const theme = {
  dark: "dark",
  light: "light",
};

export function setCallback(cb) {
  callback = cb;
}

export function toggleTheme() {
  const state = getCurrentTheme() === theme.light ? theme.dark : theme.light;
  setCurrentTheme(state);
  localStorage.setItem(localStorageItem, state);
  callback?.();
}

export function getCurrentTheme() {
  return localStorage.getItem(localStorageItem) ?? null;
}

export function setCurrentTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function init() {
  const darkModeMql =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  setCurrentTheme(getCurrentTheme() ?? darkModeMql);
  document.querySelector("#theme-changer").onclick = toggleTheme;
}

init();
