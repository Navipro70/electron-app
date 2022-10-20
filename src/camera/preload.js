const { contextBridge, ipcRenderer } = require("electron");

const { CameraIpcEvents } = require("./constants");

contextBridge.exposeInMainWorld("electronAPI", {
 sendImage: (imageData) =>
  ipcRenderer.send(CameraIpcEvents.sendImage, imageData),
 closeWindow: () => ipcRenderer.send(CameraIpcEvents.closeWindow),
});
