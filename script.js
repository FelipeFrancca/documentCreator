function execCmd(command, value = null) {
  document.execCommand(command, false, value);
}

function generateDynamicRuler() {
  const rulerX = document.querySelector(".ruler-x");
  const rulerY = document.querySelector(".ruler-y");

  rulerX.innerHTML = "";
  rulerY.innerHTML = "";

  const pageWidth = 794;
  const pageHeight = 1123;

  const pixelsPerCm = 37.8;

  const cmWidth = pageWidth / pixelsPerCm;
  const cmHeight = pageHeight / pixelsPerCm;

  for (let i = 0; i <= cmWidth; i++) {
    let cm = document.createElement("span");
    cm.textContent = i;
    cm.style.width = `${pixelsPerCm}px`;
    cm.style.textAlign = "center";
    rulerX.appendChild(cm);
  }

  for (let i = 0; i <= cmHeight; i++) {
    let cm = document.createElement("span");
    cm.textContent = i;
    cm.style.height = `${pixelsPerCm}px`;
    cm.style.textAlign = "right";
    rulerY.appendChild(cm);
  }
}

function generateLorem() {
  const length = prompt("Quantos caracteres de Lorem Ipsum você deseja?");
  if (length && !isNaN(length)) {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      .repeat(Math.ceil(length / 56))
      .substring(0, length);
    const firstEditor = document.querySelector(".editor");
    firstEditor.innerText += lorem;
  }
}

function saveDocument() {
  const editorContent = document.getElementById("editor-wrapper").innerHTML;
  const blob = new Blob([editorContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "documento.html";
  link.click();
}

window.onload = function () {
  generateDynamicRuler();
};

document.addEventListener("DOMContentLoaded", function () {
  const editorWrapper = document.getElementById("editor-wrapper");

  function checkContentOverflow() {
    const editors = document.querySelectorAll(".editor");
    let lastEditor = editors[editors.length - 1];

    if (lastEditor.scrollHeight > lastEditor.offsetHeight) {
      const newEditor = document.createElement("div");
      newEditor.classList.add("editor");
      newEditor.setAttribute("contenteditable", "true");
      editorWrapper.appendChild(newEditor);

      lastEditor = newEditor;

      moveCursorToStart(newEditor);
      newEditor.focus();
    }
  }

  document
    .getElementById("editor-wrapper")
    .addEventListener("input", checkContentOverflow);

  document.addEventListener("keydown", (event) => {
    const currentEditor = document.activeElement;
    
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        handleVerticalNavigation(event.key, currentEditor);
    }
  });

  function handleVerticalNavigation(key, currentEditor) {
    const nextEditor = currentEditor.nextElementSibling;
    const prevEditor = currentEditor.previousElementSibling;

    if (key === 'ArrowDown' && nextEditor) {
        moveCursorToStart(nextEditor);
        nextEditor.focus();
    } else if (key === 'ArrowUp' && prevEditor) {
        moveCursorToEnd(prevEditor);
        prevEditor.focus();
    }
  }

  function moveCursorToStart(editor) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(editor, 0);
    range.setEnd(editor, 0);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function moveCursorToEnd(editor) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
