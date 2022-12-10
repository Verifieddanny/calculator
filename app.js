//color change interactivity
const mode = document.querySelector(".mode");
const mode1 = document.querySelector(".mode1");
const mode2 = document.querySelector(".mode2");
const body = document.querySelector("body");
const mainCont = document.querySelector(".mainContainer");

mode.addEventListener("click", function () {
  // mode.classList.toggle("dark");
  // body.classList.toggle("change");
  // mainCont.classList.toggle("change");
  // result.classList.toggle("dark");
  if (
    body.style.backgroundColor === `#fb4db8` ||
    body.style.backgroundColor === `#1af606` ||
    body.style.backgroundColor === `black`
  ) {
    body.style.backgroundColor = `white`;
    mode.classList.add("dark");
    result.classList.add("dark");
    mainCont.style.backgroundColor = `white`;
    mainCont.style.boxShadow = ` 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.256)`;
  } else {
    body.style.backgroundColor = `black`;
    mainCont.style.backgroundColor = `black`;
    mainCont.style.boxShadow = ` 0 0.5rem 2rem 0 rgba(255, 255, 255, 0.256)`;
    mode.classList.remove("dark");
    result.classList.remove("dark");
  }
});

mode1.addEventListener("click", function () {
  body.style.backgroundColor = `#fb4db8`;
  mainCont.style.backgroundColor = `#fb4db8`;
  mainCont.style.boxShadow = `0 0.5rem 2rem 0 #c7c7c7`;
});
mode2.addEventListener("click", function () {
  body.style.backgroundColor = `#1af606`;
  mainCont.style.backgroundColor = `#1af606`;
  mainCont.style.boxShadow = `0 0.5rem 2rem 0 #c7c7c7`;
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
  digit.addEventListener("click", () => {
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
  result.innerHTML = firstNumber;
  firstNumber = firstNumber;
  console.log(firstNumber, result.innerHTML);
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
  } else if (symbol === "+") {
    let firstNumber2 = Number(firstNumber);
    let secondNumber2 = Number(secondNumber);
    endpoint = firstNumber2 + secondNumber2;
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
