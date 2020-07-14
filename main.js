const INITIAL_GRID_SQUARES_PER_SIDE = 16;
let colorGridSquare = colorGridSquareBlack;

const grid = document.querySelector("#grid");

window.addEventListener("resize", setGridSquareHeight)

const buttonReset = document.querySelector("#reset-button");
buttonReset.addEventListener("click", resetGrid);

const buttonSolid = document.querySelector("#solid-button");
buttonSolid.addEventListener("click", () => {colorGridSquare = colorGridSquareBlack});

const buttonTransparent = document.querySelector("#transparent-button");
buttonTransparent.addEventListener("click", () => {colorGridSquare = colorGridSquarePartiallyBlack});

const buttonRandom = document.querySelector("#random-button");
buttonRandom.addEventListener("click", () => {colorGridSquare = colorGridSquareColorful});

createGrid(INITIAL_GRID_SQUARES_PER_SIDE);

function createGrid(squaresPerSide) {
    for (let i = 0; i < squaresPerSide ** 2; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.addEventListener("mouseover", (e) => colorGridSquare(e.target));

        grid.appendChild(gridSquare);
    }

    setGridSquareTemplate(squaresPerSide);
}

function setGridSquareTemplate(squaresPerSide) {
    grid.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
    setGridSquareHeight();
}

function setGridSquareHeight() {
    const gridSquares = document.querySelectorAll(".grid-square");
    const gridSqareWidth = getComputedStyle(gridSquares[0]).width;
    gridSquares.forEach(gridSquare => {
        gridSquare.style.height = gridSqareWidth;
    });
}

function resetGrid() {
    const squaresPerSide = prompt("How many squares per side?", "16");

    if (squaresPerSide === null || isNaN(squaresPerSide) || squaresPerSide <= 0) {
        return;
    } else {
        while (grid.lastElementChild !== null) {
            grid.removeChild(grid.lastElementChild);
        }

        createGrid(squaresPerSide);
    }
}

function colorGridSquareBlack(element) {
    element.style.backgroundColor = "black";
}

function colorGridSquarePartiallyBlack(element) {
    const alpha = getAlpha(getComputedStyle(element).backgroundColor);
    let newAlpha = alpha + 0.1;
    if (newAlpha >= 1) {
        newAlpha = 1;
    }
    element.style.backgroundColor = `rgba(0, 0, 0, ${newAlpha})`;
}

function colorGridSquareColorful(element) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function getAlpha(rbga) {
    const rgbaArray = rbga.slice(0, rbga.length - 1).split(", ");
    return rgbaArray.length === 3 ? 1 : Number(rgbaArray[rgbaArray.length - 1]);
}