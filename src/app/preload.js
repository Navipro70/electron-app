const { contextBridge, ipcRenderer } = require("electron");

const AppIpcEvents = Object.freeze({
 getImage: "AppIpcEvents-get-image",
});

window.addEventListener("DOMContentLoaded", () => {
 const replaceText = (selector, text) => {
  const element = document.getElementById(selector);

  if (element) element.innerText = text;
 };

 ["chrome", "node", "electron"].forEach((tool) => {
  replaceText(`${tool}-version`, process.versions[tool]);
 });
});

contextBridge.exposeInMainWorld("electronAPI", {
 getImage: (callback) => ipcRenderer.on(AppIpcEvents.getImage, callback),
});
