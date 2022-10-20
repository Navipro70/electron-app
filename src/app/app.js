const image = document.getElementById("image");

window.electronAPI.getImage((_, data) => {
 image.src = data;
});
