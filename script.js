let gridSize = 16;
let mode = 'fill';

const sketchContainer = document.getElementById('sketch-container')

sketchContainer.addEventListener('animationend', () => {
  sketchContainer.classList.remove('wobble');
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
  clearGrid();
});

const resizeButton = document.getElementById('resize');
const sketchContent = document.getElementById('sketch-content');
resizeButton.addEventListener('click', function() {
  let newSize = prompt('What should the new grid size be?');

  while (newSize > 100 || newSize < 0 || isNaN(newSize)) {
    newSize = prompt('Make sure you enter an integer between 1 and 100!');
  }
  
  // this if statement prevents the sketch from disappearing if the user
  // cancels out the newSize prompt
  if (newSize) {
    gridSize = newSize;

    while (sketchContent.firstChild) {
      sketchContent.removeChild(sketchContent.firstChild);
    }

    populateGrid();
  }
})

const modeSelector = document.getElementById('modeSelector');
modeSelector.onchange = function() {
  clearGrid();
  mode = modeSelector.value;
}

function populateGrid() {
  sketchContent.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  sketchContent.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (i = 0; i < Math.pow(gridSize, 2); i++) {
    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.addEventListener('mouseover', modifyCell);
    newCell.addEventListener('animationend', function() {
      this.classList.remove('fadeOut', 'fill');
      // removing the background color like this allows this
      // function to work on rainbow/grayscale cells
      this.style.backgroundColor = '';
    });
    sketchContent.appendChild(newCell);
  }
}

function clearGrid() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.add('fadeOut');
  });

  sketchContainer.classList.add('wobble');
};

function modifyCell() {
  if (mode === 'fill') {
    this.classList.add('fill');
  } else if (mode ==='grayscale') {
      let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
      this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
  } else if (mode === 'rainbow') {
    this.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
  }
}

populateGrid();
