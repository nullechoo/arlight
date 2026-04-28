import { getCurrentTheme, setCallback, setCurrentTheme } from "/src/theme.js";

const worker = new SharedWorker(`/src/worker.js`);
const tabsCounter = document.querySelector("#tabs-counter");
setCallback(() => worker.port.postMessage(getCurrentTheme()));
worker.port.onmessage = (event) => {
  tabsCounter.textContent = event.data.tabs;
  setCurrentTheme(getCurrentTheme());
};

worker.port.postMessage(getCurrentTheme());
