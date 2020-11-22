let gridSize = 16;
let mode = 'fill';

const sketchContainer = document.getElementById('sketch-container')

sketchContainer.addEventListener('animationend', () => {
  sketchContainer.classList.remove('wobble');
});

const sketchContent = document.getElementById('sketch-content');

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
  clearGrid();
});

const resizeButton = document.getElementById('resize');
resizeButton.addEventListener('click', function() {
  let newSize = prompt('What should the new grid size be?');

  while (newSize > 100 || newSize < 0 || isNaN(newSize)) {
    newSize = prompt('Make sure you enter an integer between 1 and 100!');
  }

  gridSize = newSize;

  while (sketchContent.firstChild) {
    sketchContent.removeChild(sketchContent.firstChild);
  }

  populateGrid();
})

const eraseButton = document.getElementById('erase');
eraseButton.addEventListener('click', function() {
  if (mode === 'fill') {
    mode = 'erase';
    eraseButton.textContent = 'Fill';
  } else if (mode === 'erase') {
    mode = 'fill';
    eraseButton.textContent = 'Erase';
  }
});

function populateGrid() {
  sketchContent.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  sketchContent.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (i = 0; i < Math.pow(gridSize, 2); i++) {
    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.addEventListener('mouseover', modifyCell);
    newCell.addEventListener('animationend', function() {
      this.classList.remove('fadeOut', 'fill');
    });
    sketchContent.appendChild(newCell);
  }
}

function clearGrid() {
  document.querySelectorAll('.fill').forEach(cell => {
    cell.classList.add('fadeOut');
  });

  sketchContainer.classList.add('wobble');
};

function modifyCell() {
  if (mode === 'fill') {
    this.classList.add('fill');
  } else if (mode === 'erase') {
    if (this.classList.contains('fill')) {
      this.classList.remove('fill');
    }
  }
}

populateGrid();
