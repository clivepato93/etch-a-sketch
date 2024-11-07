const container = document.querySelector(".container");
const randombtn = document.getElementById("random");
const eraserBtn = document.getElementById("eraser");
const drawBtn = document.querySelector("#draw");
const resetBtn = document.querySelector("#reset");

const ranges = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];


let currentColor = '#000000';
let canDraw = false;
let random = false;
let eraser = false;

function generateSquares(number = 16) {
  container.innerHTML = "";

  for (let index = 0; index < number * number; index++) {
    const square = document.createElement("div");

    square.classList = "square";
    square.style.height = `${container.clientHeight / number}px`;
    square.style.width = `${container.clientWidth / number}px`;

    square.addEventListener("mouseover", function (e) {
      //   console.log(e.target);
      if (canDraw && !random && !eraser) {
        e.target.style.backgroundColor = "black";
      } else if (canDraw && random) {
        //  while (currentColor != randomColour()) {
        currentColor = randomColour();
        e.target.style.backgroundColor = currentColor;
        //   }
      } else if (!canDraw && !random && eraser) {
        currentColor = "white";
        e.target.style.backgroundColor = currentColor;
      } else {
        e.target.style.backgroundColor = e.target.style.backgroundColor;
      }
    });

    container.appendChild(square);
  }
}


function randomColour() {
let colour = ''
  while (colour.length < 6) {
    const val = Math.floor(Math.random() * (ranges.length - 1));
    colour += ranges[val];
  }
    if (colour == currentColor) {
       randomColour()
   }
  return "#" + colour;

};

randombtn.addEventListener('click', function (e) {
  
  e.preventDefault();
  random = !random

  e.target.classList.toggle("off");
  e.target.classList.toggle("on");
})

drawBtn.addEventListener("click", function (e) {
  canDraw = !canDraw;
  eraser = false;
  e.target.classList.toggle("off");
  e.target.classList.toggle("on");
});

resetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const num = prompt("Enter the number of squares for the grid");
  if (num == null) {
    return;
  }
  if (+num <= 100) {
    generateSquares(+num);
  } else {
    alert("enter a 100 or less");
  }
});

eraserBtn.addEventListener("click", function (e) {
  e.preventDefault();
  eraser = !eraser;
  if (eraser) {
    canDraw = false;
    random = false;
    
  }
  if (drawBtn.classList.contains("on")) {
    drawBtn.classList.toggle("on");
    drawBtn.classList.toggle("off");
  }
  if (randombtn.classList.contains("on")) {
    randombtn.classList.toggle("on");
    randombtn.classList.toggle("off");
  }
});


generateSquares();


