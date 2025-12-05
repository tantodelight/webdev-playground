const grid = document.querySelector(".grid");

function getRandomRgbValue() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return `rgb(${r}, ${g}, ${b})`;
}

// paints grid
grid.addEventListener("mouseover", (e) => {
    // retrieve cell's opacity value
    const currentOpacity = parseFloat(e.target.dataset.opacity);
    
    if (!e.target.classList.contains("cell")) {
        return;
    } 
    if (e.target.classList.contains("rainbow-mode")) {
        e.target.style.background = getRandomRgbValue();
    } else {
        e.target.style.background = "black";
    }
    // increase hovered cell opacity by 10%
    if (currentOpacity < 1) {
        const newOpacity = Math.min(currentOpacity + 0.1, 1);
        e.target.dataset.opacity = newOpacity; // update the value in memory
        e.target.style.opacity = newOpacity; // display it in style
    }
});

function createGrid(size) {
    grid.innerHTML = "";

    // create temporary container outside DOM
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.flex = `0 0 calc(100% / ${size})`;
        div.style.opacity = 0;
        // initialize each cell's opacity value for later use
        div.dataset.opacity = 0;
        
        fragment.appendChild(div);
    }

    grid.appendChild(fragment);
}

createGrid(16);

// resize grid
document.querySelector(".resize-btn").addEventListener("click", () => {
    const input = prompt("Enter grid size (e.g., 20 for 20x20):");
    if (input === null) return;

    const size = parseInt(input);

    if (!Number.isInteger(size) || size <= 0) {
        alert("Please enter a valid positive number!");
        return;
    }
    if (size > 100) {
        alert("Grid size cannot exceed 100.");
        return;
    }

    createGrid(size);
});

// clear grid paint
document.querySelector(".clear-btn").addEventListener("click", () => {
    grid.querySelectorAll(".cell").forEach(c => {
        c.style.background = "white"
        c.dataset.opacity = 0;
    });
});

// activate rainbow paint
const rainbowBtn = document.querySelector(".rainbow-btn");
rainbowBtn.addEventListener("click", () => {
    grid.querySelectorAll(".cell").forEach(c => c.classList.toggle("rainbow-mode"));
    rainbowBtn.classList.toggle("active-rainbow-btn");
});