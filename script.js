const buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
let num1 = null;
let num2 = null;
let operator = null;
let result;


function clearCalculator() {
    num1 = null;
    num2 = null;
    operator = null;
    result = null;
    display.value = "0";
    console.log("clear")
}

function buttonClick(event) {
    const value = event.target.innerText;
    console.log(value)
    
    if (value === "C") {
        clearCalculator();  
    } else if ("+-x÷".includes(value)) {
        handleOperator(value);
    } else if (value === "=") {
        handleMath();
    } else if (value === "←") {
        display.value = display.value.slice(0, -1);
    }
     else {
        displayUpdate(value);
    }
}

function keyDown(event) {
    console.log(` Key pressed ${event.key}`);

    if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
        event.preventDefault();
        if ("+-*/".includes(event.key))  {
            const mappedOperator = event.key === "*" ? "x" : event.key === "/" ? "÷" : event.key;
            handleOperator(mappedOperator);
        }  else {
            displayUpdate(event.key);
        }
    }

    else if (event.key === "Backspace") {
        event.preventDefault(); 
        display.value = display.value.slice(0, -1); 
    } 

    else if (event.key === "Enter") {
        event.preventDefault(); 
        handleMath()
    }

    else if (event.key === "Escape") {
        clearCalculator();
    }

    else {
        console.log(`Ignored key: ${event.key}`)
    }
}

function handleOperator (op) {
    console.log(`operator: ${op}`)
    if (num1 === null) {
        num1 = parseFloat(display.value);
        operator = op;
        display.value = op;
        console.log(`num1: ${num1}, operator: ${operator}`);
    } else if (operator === null) {
        operator = op;
        display.value = op;
        console.log(`Chaining operation: num1 ${num1}, operator: ${operator}`);
    } else {
        num2 = parseFloat(display.value);
        handleMath()
        operator = op;
        display.value = op;
        console.log(`num1: ${num1}, operator: ${operator}`)
    }
}

function handleMath() {
    console.log(`Perform calculation...`)
    if (num1 !== null && operator !== null) {
        num2 = parseFloat(display.value);
        
        if(operator === "+") {
            result = num1 + num2;
        } else if (operator === "-") {
            result = num1 - num2;
        } else if (operator === "x") {
            result = num1 * num2;
        } else if (operator === "÷") {
            result = num2 !== 0 ? num1 / num2: "Undefined";
        }

        display.value = result;
        console.log(`Result: ${result}`)
        num1 = result;
        num2 = null;
        operator = null;
        console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator}, result: ${result}`);
    }
}

function displayUpdate(value) {
    if ("+-x÷".includes(display.value)) {
        display.value = "";
    }
    if (display.value === "0") {
        display.value = "";
    }
    display.value += value;
}

function init () {
    for (let button of buttons) {
        button.addEventListener('click', buttonClick);
    }
    document.addEventListener('keydown', keyDown);
    display.value = "0";
}

init()