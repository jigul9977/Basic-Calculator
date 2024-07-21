const response = document.querySelector("#response");
const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const percentBtn = document.querySelector("[data-percent]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

//functions

const updateDisplay = function () {
  response.value = currentOperand;
};

//clear display
const clearHandler = function (e) {
  e.preventDefault();
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
};

const deleteHandler = function (e) {
  e.preventDefault();
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
};

const appendNumber = function (number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
};

const chooseOperation = function (op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
};


const compute = function () {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previousOperand) || isNaN(currentOperand)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "%":
      computation = prev % current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
};



const numberHandler = (e) => {
  e.preventDefault();
  appendNumber(e.target.innerText);
  updateDisplay();
};

const operationHandler = (e) => {
  e.preventDefault();
	chooseOperation(e.target.innerText);
	updateDisplay();
};

const equalHandler = function (e) {
	e.preventDefault();
	compute();
	updateDisplay();
	currentOperand = "";
};

const percentHandler = function (e) {
	e.preventDefault();
	if (currentOperand === "") return;
	currentOperand = (parseFloat(currentOperand) / 100).toString();
	updateDisplay();
  }

//Event Listener

allClearBtn.addEventListener("click", clearHandler);

deleteBtn.addEventListener("click", deleteHandler);

numberBtn.forEach((btn) => btn.addEventListener("click", numberHandler));

operationBtn.forEach((btn) => btn.addEventListener("click", operationHandler));

equalsBtn.addEventListener("click", equalHandler);

percentBtn.addEventListener("click", percentHandler);