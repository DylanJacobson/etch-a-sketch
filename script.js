let gridSize = 16;

const sketchContainer = document.getElementById("sketch-container");

sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
sketchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

const clearButton = document.getElementById("clear");

clearButton.addEventListener('click', function() {
  clearGrid();
});

const resizeButton = document.getElementById("resize");

resizeButton.addEventListener('click', function() {
  let newSize = prompt("What should the new grid size be?");
  gridSize = newSize;

  while (sketchContainer.firstChild) {
    sketchContainer.removeChild(sketchContainer.firstChild);
  }

  populateGrid();
})

function populateGrid() {
  sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (i = 0; i < Math.pow(gridSize, 2); i++) {
    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.addEventListener('mouseover', function() {
      this.classList.add('fill');
    });
    sketchContainer.appendChild(newCell);
  }
}

function clearGrid() {
  document.querySelectorAll('.fill').forEach(cell => {
    cell.classList.remove('fill');
  });
};

populateGrid();
