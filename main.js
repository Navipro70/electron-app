const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
 const win = new BrowserWindow({
  width: 800,
  height: 500,
  webPreferences: {
   preload: path.join(__dirname, "preload.js"),
  },
 });

 win.loadFile("index.html");
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
