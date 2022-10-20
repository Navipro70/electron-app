const { contextBridge, ipcRenderer } = require("electron");

const CameraIpcEvents = Object.freeze({
 sendImage: "cameraICPEvent-send-image",
 closeWindow: "cameraICPEvent-close-window",
});

contextBridge.exposeInMainWorld("electronAPI", {
 sendImage: (imageData) =>
  ipcRenderer.send(CameraIpcEvents.sendImage, imageData),
 closeWindow: () => ipcRenderer.send(CameraIpcEvents.closeWindow),
});
