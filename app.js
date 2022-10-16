//color change interactivity
const mode = document.querySelector(".mode");
const body = document.querySelector("body");
const mainCont = document.querySelector(".mainContainer");

mode.addEventListener("click", function () {
  mode.classList.toggle("dark");
  body.classList.toggle("change");
  mainCont.classList.toggle("change");
  result.classList.toggle("dark");
});

//calculator functionality
const numbers = document.querySelectorAll(".numbers");
const signs = document.querySelectorAll(".operate");
const clear = document.querySelector(".AC");
const plusMinus = document.querySelector(".plus_minus");
const equalTo = document.querySelector(".equal");
const result = document.querySelector(".result");
const percent = document.querySelector(".percent");

let firstNumber = "";
let isFirstNumber = false;
let secondNumber = "";
let isSecondNumber = false;
let symbol = "";
let endpoint = 0;

for (const digit of numbers) {
  digit.addEventListener("click", (e) => {
    let num = digit.innerHTML;

    if (isFirstNumber === false) {
      getFirstDigit(num);
    }

    if (isSecondNumber === false) {
      getSecondDigit(num);
    }
  });
}

function getFirstDigit(input) {
  result.innerHTML = "";
  firstNumber += input;
  //   if (input === ".") {
  //     firstNumber += input;
  //   }
  result.innerHTML = firstNumber;
  firstNumber = firstNumber;
}

function getSecondDigit(input) {
  if (firstNumber != "" && symbol != "") {
    secondNumber += input;
    result.innerHTML = secondNumber;
    secondNumber = secondNumber;
  }
}

function getSign() {
  for (const sign of signs) {
    sign.addEventListener("click", (e) => {
      symbol = sign.innerHTML;
      isFirstNumber = true;
    });
  }
}

getSign();

equalTo.addEventListener("click", function () {
  result.innerHTML = "";
  if (symbol === "÷") {
    endpoint = firstNumber / secondNumber;
  } else if (symbol === "x") {
    endpoint = firstNumber * secondNumber;
  } else if (symbol === "-") {
    endpoint = firstNumber - secondNumber;
  } else {
    endpoint = firstNumber + secondNumber;
  }
  result.innerHTML = endpoint;
  firstNumber = result.innerHTML;
  secondNumber = "";

  decimalFix();
});

function decimalFix() {
  endpoint = String(endpoint);

  if (endpoint.length >= 7) {
    endpoint = Number(endpoint);
    result.innerHTML = endpoint.toExponential(2);
  }
}

plusMinus.addEventListener("click", function () {
  result.innerHTML = "";

  if (firstNumber != "") {
    endpoint = -firstNumber;
    firstNumber = endpoint;
  }

  if (firstNumber != "" && secondNumber != "" && symbol != "") {
    endpoint = -endpoint;
  }
  result.innerHTML = endpoint;
});

percent.addEventListener("click", function () {
  result.innerHTML = "";

  if (firstNumber != "") {
    endpoint = firstNumber / 100;
    firstNumber = endpoint;
  }

  if (firstNumber != "" && secondNumber != "" && symbol != "") {
    endpoint = endpoint / 100;
  }
  result.innerHTML = endpoint;
});

clear.addEventListener("click", function () {
  firstNumber = "";
  isFirstNumber = false;
  secondNumber = "";
  isSecondNumber = false;
  symbol = "";
  endpoint = 0;
  result.innerHTML = 0;
});
