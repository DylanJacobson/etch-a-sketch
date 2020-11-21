let gridSize = 16;
let mode = "fill";

const sketchContainer = document.getElementById("sketch-container")

sketchContainer.addEventListener('animationend', () => {
  sketchContainer.classList.remove("animate__animated", "animate__wobble");
});

const sketchContent = document.getElementById("sketch-content");

const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', function() {
  clearGrid();
});

const resizeButton = document.getElementById("resize");
resizeButton.addEventListener('click', function() {
  let newSize = prompt("What should the new grid size be?");
  gridSize = newSize;

  while (sketchContent.firstChild) {
    sketchContent.removeChild(sketchContent.firstChild);
  }

  populateGrid();
})

const eraseButton = document.getElementById("erase");
eraseButton.addEventListener('click', function() {
  if (mode === "fill") {
    mode = "erase";
    eraseButton.textContent = "Fill";
  } else if (mode === "erase") {
    mode = "fill";
    eraseButton.textContent = "Erase";
  }
});

function populateGrid() {
  sketchContent.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  sketchContent.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (i = 0; i < Math.pow(gridSize, 2); i++) {
    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.addEventListener('mouseover', modifyCell);
    sketchContent.appendChild(newCell);
  }
}

function clearGrid() {
  document.querySelectorAll('.fill').forEach(cell => {
    cell.classList.remove('fill');
  });

  sketchContainer.classList.add("animate__animated", "animate__wobble");
};

function modifyCell() {
  if (mode === "fill") {
    this.classList.add('fill');
  } else if (mode === "erase") {
    if (this.classList.contains('fill')) {
      this.classList.remove('fill');
    }
  }
}

populateGrid();
