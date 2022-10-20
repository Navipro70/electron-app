const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("./menu");
const { AppIpcEvents } = require("./src/app/constants");
const { CameraIpcEvents } = require("./src/camera/constants");

const createWindow = () => {
 const getAppFilePath = (file) => path.join(__dirname, "src", "app", file);

 const mainWindow = new BrowserWindow({
  width: 800,
  height: 800,
  webPreferences: { preload: getAppFilePath("preload.js") },
 });

 ipcMain.on(CameraIpcEvents.sendImage, (_, data) => {
  mainWindow.webContents.send(AppIpcEvents.getImage, data);
 });

 mainWindow.loadFile(getAppFilePath("app.html"));
};

app.whenReady().then(() => {
 createWindow();
});

app.on("window-all-closed", () => {
 if (process.platform !== "darwin") app.quit();

 app.on("activate", () => {
  const IS_NO_OPENED_WINDOWS = BrowserWindow.getAllWindows().length === 0;

  if (IS_NO_OPENED_WINDOWS) createWindow();
 });
});
