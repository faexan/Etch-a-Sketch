const btnrgb = "rgb(29,154,144)";
const btnGrd = "#403b3b";
const textColor = "white";
let gridhHeight;
let gridWidth;

let slidebar = document.querySelector("#grid-size");
let gridSizeDisplay = document.querySelector(".grid-size-Display");
const colorInput = document.querySelector(".custom-color-input");
const mainDiv = document.createElement("div");
const boxes = document.querySelectorAll(".childDiv");
const content = document.querySelector(".main-content");
content.appendChild(mainDiv);
mainDiv.classList.add("mainDiv");
let gridCss = window.getComputedStyle(mainDiv);
gridWidth = parseInt(gridCss.getPropertyValue("width"));
gridHeight = parseInt(gridCss.getPropertyValue("height"));
let slidebarValue = slidebar.value;
function setupEventListeners(color, random) {
  const boxes = document.querySelectorAll(".childDiv");
  boxes.forEach((box) => {
    box.addEventListener("mousedown", (event) => {
      mouseDown = true;
      if (random == true) {
        changeColor(event.target, getRandomColor())
      } else {
        changeColor(event.target, color);
      }
    });
    box.addEventListener("mouseover", (event) => {
      if (mouseDown) {
        if (random == true) {
          changeColor(event.target, getRandomColor())
        } else {
          changeColor(event.target, color);
        }
      }
    });
    box.addEventListener("mouseup", () => {
      mouseDown = false;
    });
  });
}
function clearGrid() {
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }
}
slidebar.addEventListener("input", slidebarGrid);
function slidebarGrid() {
  slidebarValue = slidebar.value;
  let defGridValue = 10;
  currGridValue = parseInt(defGridValue + (slidebarValue * 0.9));
  gridSizeDisplay.innerText = `${currGridValue} x ${currGridValue}`;
  clearGrid();
  createGrid(currGridValue);
  customColor(currGridValue);
}
function createGrid(gridValue) {
  for (let i = 0; i < gridValue; i++) {
    let parentDivs = document.createElement("div");
    for (let j = 0; j < gridValue; j++) {
      let childDivs = document.createElement("div");
      childDivs.style.cssText = `width: ${gridWidth / gridValue}px; height: ${gridHeight / gridValue}px; `;
      childDivs.classList.add("childDiv");
      parentDivs.appendChild(childDivs);
    }
    parentDivs.classList.add("parentDiv");
    mainDiv.appendChild(parentDivs);
  }
  setupEventListeners(colorInput.value);
}
createGrid(16);
let mouseDown = false;
setupEventListeners("black");
customColor(16);
mainDiv.addEventListener("mouseup", () => {
  mouseDown = false;
});
function customColor(gridValue) {
colorInput.addEventListener("input", () => {
  defaultBtnClrs();
  let customColor = colorInput.value;
  clearGrid();
  createGrid(gridValue);
  setupEventListeners(customColor)
})
}
function changeColor(box, color) {
  box.style.backgroundColor = color;
}

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
  clearGrid();
  createGrid(16);
});

const eraserBtn = document.querySelector(".eraser");
eraserBtn.addEventListener("click", () => {
  setupEventListeners("White");
})

function getRandomColor() {
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}

const randomBtn = document.querySelector(".random");
randomBtn.addEventListener("click", () => {
  let randomColor = getRandomColor();
  setupEventListeners(randomColor, true);
});

function defaultBtnClrs() {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.style.background = "rgba(255, 255, 255, 0.7)";
    btn.style.color = "black";
});  
};

const btn0 = document.querySelector(".black");
const btn1 = document.querySelector(".random");
const btn2= document.querySelector(".eraser");
const btn3 = document.querySelector(".reset");

btn0.addEventListener("click", () => {
  defaultBtnClrs();
  btn0.style.background = btnGrd;
  btn0.style.color = textColor;
});
btn0.addEventListener("click", () => {
  setupEventListeners("black");
})
btn1.addEventListener("click", () => {
  defaultBtnClrs();
  btn1.style.background = btnGrd;
  btn1.style.color = textColor;
});
btn2.addEventListener("click", () => {
  defaultBtnClrs();
  btn2.style.background = btnGrd;
  btn2.style.color = textColor;
});
btn3.addEventListener("mousedown", () => {
  defaultBtnClrs();
  btn0.style.background = btnGrd;
  btn0.style.color = textColor;
});