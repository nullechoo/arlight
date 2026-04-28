import { getCurrentTheme, setCallback, setCurrentTheme } from "/src/theme.js";

const worker = new SharedWorker(
  new URL("./worker.js?worker&shared", import.meta.url),
);
const tabsCounter = document.querySelector("#tabs-counter");
setCallback(() => worker.port.postMessage(getCurrentTheme()));

worker.port.onmessage = (event) => {
  tabsCounter.textContent = event.data.tabs;
  setCurrentTheme(getCurrentTheme());
};

worker.port.postMessage(getCurrentTheme());

window.addEventListener("beforeunload", () => {
  worker.port.postMessage("close");
});
