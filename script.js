"use strict";

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const deleteRes = document.querySelector(".delete");
const equalRes = document.querySelector(".equal");
const secondResult = document.querySelector(".first-line");
const mainResult = document.querySelector(".second-line");
const plusMinus = document.querySelector(".plus-minus");

let currResult = "";
let prevResult = "";
let operator = undefined;

const calcResult = function () {
  let action;
  if (!currResult || !prevResult) {
    return;
  }

  const current = parseFloat(currResult);
  const previous = parseFloat(prevResult);

  if (isNaN(current) || isNaN(previous)) {
    return;
  }

  switch (operator) {
    case "+":
      action = previous + current;
      break;
    case "-":
      action = previous - current;
      break;
    case "÷":
      action = previous / current;
      break;
    case "x":
      action = previous * current;
      break;
    case "%":
      action = (previous / 100) * current;
      break;
    default:
      return;
  }

  currResult = action;
  operator = undefined;
  prevResult = "";
};

const result = function () {
  mainResult.innerText = currResult;
  if (operator != null) {
    secondResult.innerText = prevResult + operator;
  } else {
    secondResult.innerText = "";
  }
};

const checkOperator = function (operators) {
  if (currResult === "") {
    return;
  }
  if (prevResult !== "") {
    calcResult();
  }
  operator = operators;
  prevResult = currResult;
  currResult = "";
};

const deleteResult = function () {
  currResult = currResult.toString().slice(0, 0);
  if (currResult === "") {
    prevResult = prevResult.toString().slice(0, 0);
    operator = "";
  }
};

const addPlusMinus = function () {
  if (currResult) {
    currResult = -currResult;
  } else if (currResult < 0) {
    currResult;
  }
};

const addNumber = function (number) {
  currResult = currResult.toString() + number.toString();
  if (currResult.includes(".")) {
    return;
  }
};

plusMinus.addEventListener("click", function () {
  addPlusMinus();
  result();
});

numbers.forEach((number) => {
  number.addEventListener("click", function () {
    addNumber(number.innerText);
    result();
  });
});

deleteRes.addEventListener("click", function () {
  deleteResult();
  result();
});

operators.forEach((operator) => {
  operator.addEventListener("click", function () {
    checkOperator(operator.innerText);
    result();
  });
});

equalRes.addEventListener("click", function () {
  calcResult();
  result();
});
