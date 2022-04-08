let mode = 'color';
let colorValue = '#000000';
let gridSize = 16;
let mousedown = false;

function colorGrid(box) {
    box.style.backgroundColor = colorValue;
}

function rainbowGrid(box) {
    box.style.backgroundColor = getRandomColor();
}

function eraserGrid(box) {
    box.style.backgroundColor = 'white';
}

function triggered(e) {

    if(e.type == 'mousedown') {
        mousedown = true;
    };

    if(mousedown === false) return

    if(mode == 'color') {
        colorGrid(this);
    }
    else if(mode =='rainbow') {
        rainbowGrid(this);
    }
    else if (mode == 'eraser') {
        eraserGrid(this);
    }
}

function buildGrid() {
    clearGrid();
    const gridContainer = document.querySelector('.grid');
    gridContainer.textContent = '';
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for(let i = 0; i < (gridSize ** 2); i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add('grid-box');
        gridBox.addEventListener('mouseup', () => {
            mousedown = false;
        })
        gridBox.addEventListener('mousedown', triggered)
        gridBox.addEventListener('mouseover', triggered);
        gridContainer.appendChild(gridBox);
    }
}

function clearGrid() {
    const gridBoxes = document.querySelectorAll('.grid-box');
    gridBoxes.forEach(gridBox => gridBox.style.backgroundColor = 'white');
}

function updateMode(tool) {
    if(tool.classList.contains('brush-button')) {
        mode = 'color';
    }
    else if(tool.classList.contains('rainbow-button')) {
        mode = 'rainbow';
    }
    else if(tool.classList.contains('eraser-button')) {
        mode = 'eraser'
    }
    else if(tool.classList.contains('clear-button')) {
        clearGrid();
    }
}

const gridRange = document.querySelector('.grid-range');
gridRange.addEventListener('input', function() {
    const rangeLabel = document.querySelector('.range-label');
    rangeLabel.textContent = `${this.value}x${this.value}`;
})
gridRange.addEventListener('change', function() {
    gridSize = this.value;
    buildGrid();
})

const colorPicker = document.querySelector('.color-picker');
colorPicker.addEventListener('change', function() {
    colorValue = this.value;
})


const tools = document.querySelectorAll('.tools');
tools.forEach(tool => tool.addEventListener('click', function() {
    updateMode(this);
    if(this.classList.contains('clear-button')) return
    const activeTool = document.querySelector('.active');
    activeTool.classList = activeTool.className.replace('active', '');
    this.className += ' active';
}))

buildGrid();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }