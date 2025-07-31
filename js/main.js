const input = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");

input.addEventListener("change", (event) => {
  const files = event.target.files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("draggable");

      img.style.top = "50px";
      img.style.left = "50px";

      canvas.appendChild(img);
      enableDragAndResize(img);
    };

    reader.readAsDataURL(file);
  });
});

function enableDragAndResize(element) {
  let isDragging = false;
  let startX, startY;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - element.offsetLeft;
    startY = e.clientY - element.offsetTop;
    element.style.zIndex = Date.now();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      element.style.left = e.clientX - startX + "px";
      element.style.top = e.clientY - startY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  element.addEventListener("wheel", (e) => {
    e.preventDefault();
    let width = parseInt(getComputedStyle(element).width);
    let newWidth = width + (e.deltaY < 0 ? 15 : -15);
    if (newWidth > 40) {
      element.style.width = newWidth + "px";
    }
  });

  element.addEventListener("dblclick", () => {
    element.remove();
  });
}
