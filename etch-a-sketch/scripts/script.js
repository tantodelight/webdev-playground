const grid = document.querySelector(".grid");

// build a grid and enable permanent paint on hover
function createGrid(size) {
    for (let i = 0; i < (size * size); i++) {
        const div = document.createElement("div");
        grid.append(div);
        div.textContent = "";
    }
    document.querySelectorAll('.grid div').forEach(div => div.classList.add('cell'));
    
    const cell = document.querySelectorAll(".cell");
    
    cell.forEach(cell => {
        cell.addEventListener('pointerover', () => {
            cell.style.background = "black";
        });
    });
}

createGrid(16);

const resizeBtn = document.querySelector(".resize-btn");

// resize the grid & validate user input
resizeBtn.addEventListener('click', () => {
    const gridSize = prompt("Enter grid size (e.g., 20 for 20x20):");
    
    if (gridSize === null) return;
    
    const size = parseInt(gridSize);
    
    if (size > 100) {
        alert("Grid size cannot exceed 100.");
        return;
    }
    
    if (!isNaN(size) && size > 0) {
        grid.innerHTML = "";
        createGrid(size);
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.flex = `0 0 calc(100% / ${size})`;
        });
    } else {
        alert("Please enter a valid positive number!");
    }
});

// clear every paint off the grid
const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
    const cell = document.querySelectorAll(".cell");
    cell.forEach(cell => cell.style.background = "white");
})