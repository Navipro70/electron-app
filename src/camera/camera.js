const video = document.getElementById("camera");
const button = document.getElementById("button");

navigator.mediaDevices
 .getUserMedia({ video: { facingMode: "user" } })
 .then((stream) => {
  video.srcObject = stream;
 });

button.addEventListener("click", () => {
 const canvas = document.createElement("canvas");

 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;

 canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

 const imageData = canvas.toDataURL();

 window.electronAPI.sendImage(imageData);
 window.electronAPI.closeWindow();
});
