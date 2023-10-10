const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator");
const displayEle = document.querySelector(".input");
const num = document.querySelectorAll(".num");

let Operator = " ";
let previousNum = " ";
let resentNum = " ";

let calculate = (n1, operator, n2) => {
  let result = 0;
  switch (operator) {
    case "+":
      result = Number(n1) + Number(n2);
      break;
    case "-":
      result = Number(n1) - Number(n2);
      break;
    case "x":
      result = Number(n1) * Number(n2);
      break;
    case "/":
      result = Number(n1) / Number(n2);
      break;
    default:
      break;
  }
  return String(result);
};

let calculator = () => {
  let isFirstDigit = true;

  buttons.forEach((item) => {
    item.addEventListener("click", (e) => {
      let action = e.target.classList[0];
      let click = e.target.innerHTML;

      if (action === "operator") {
        Operator = click;
        previousNum = displayEle.textContent;
        displayEle.textContent = '';
        isFirstDigit = true; 
      }
      if (action === "num") {
        if (isFirstDigit && click === "0") {
          return;
        }

        if (displayEle.textContent === "" && Operator === "") {
          displayEle.textContent = click;
          previousNum = displayEle.textContent;
        }

        else if (displayEle.textContent !== "" && Operator === "") {
          displayEle.textContent = 
          displayEle.textContent + click;
          previousNum = displayEle.textContent;
        }

        else if (displayEle.textContent === "" && Operator !== "") {
          displayEle.textContent = click;
          resentNum = displayEle.textContent;
        }

        else if (displayEle.textContent !== "" && Operator !== "") {
          displayEle.textContent = 
          displayEle.textContent + click;
          resentNum = displayEle.textContent;
        }

        isFirstDigit = false; 
      }

      if (action === "result") {
        displayEle.textContent = calculate(
          previousNum,
          Operator,
          resentNum
        );
        isFirstDigit = true; 
      }
      if (action === "ac") {
        displayEle.textContent = "";
        previousNum = "";
        Operator = "";
        resentNum = "";
        isFirstDigit = true; 
      }
    });
  });
};
calculator();