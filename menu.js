const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { CameraIpcEvents } = require("./src/camera/constants");

let newWindow = null;

const menuItems = [
 { label: app.name, submenu: [{ label: "About" }] },
 {
  label: "Camera",
  submenu: [
   {
    label: "Open camera",
    click: () => {
     const getCameraFilePath = (file) =>
      path.join(__dirname, "src", "camera", file);

     const onClose = () => {
      if (newWindow) {
       newWindow?.close();
       newWindow = null;
      }
     };

     onClose();

     newWindow = new BrowserWindow({
      width: 800,
      height: 800,
      show: false,
      webPreferences: { preload: getCameraFilePath("preload.js") },
     });

     ipcMain.on(CameraIpcEvents.closeWindow, onClose);

     newWindow.loadFile(getCameraFilePath("camera.html"));
     newWindow.once("ready-to-show", newWindow.show);
    },
   },
   { type: "separator" },
   { label: "Exit", click: app.quit },
  ],
 },
 {
  label: "Window",
  submenu: [{ role: "close" }, { role: "minimize" }],
 },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuItems));
