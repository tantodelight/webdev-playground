let currentNumber = '';
let previousNumber = '';
let opSign = '';

let lastOpText = '';

const container = document.querySelector('.container');
const screen1 = document.querySelector('.screen1');
const screen2 = document.querySelector('.screen2');

// operations
function add(a,b) { return a + b }
function subtract(a, b) { return a - b }
function divide(a, b) {
    if (b === 0) {
        return "Can't divide by 0";
    }
    let ans = a / b;
    return ans % 1 !== 0 ? Number(ans.toFixed(12)) : ans;
}
function multiply(a, b) { return a * b }

function operator(op, num1, num2) {
    switch (op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "÷":
            return divide(num1, num2);
        case "x":
            return multiply(num1, num2);
    }
}

// handlers
function handleNumber(digit) {
    currentNumber += digit.textContent;
}
function handleOperator(sign) {
    if (previousNumber && currentNumber && opSign) {
        previousNumber = Number(previousNumber);
        currentNumber = Number(currentNumber);
        previousNumber = operator(opSign, previousNumber, currentNumber);
        currentNumber = '';
    } else {
        previousNumber = currentNumber;
        currentNumber = '';
    }

    opSign = sign.textContent;
    lastOpText = '';
}
function handleEquals() {
    if (currentNumber && previousNumber && opSign) {
        currentNumber = Number(currentNumber);
        previousNumber = Number(previousNumber);
        lastOpText = `${previousNumber} ${opSign} ${currentNumber} =`
        currentNumber = operator(opSign, previousNumber, currentNumber);
        previousNumber = '';
        opSign = '';
    }
}
function handleClear() {
    currentNumber = '';
    previousNumber = '';
    opSign = '';
    lastOpText = '';
}
function handleDelete() {
    if (currentNumber) {
        currentNumber = currentNumber.toString().slice(0, -1);
    }
}
function handleDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber = currentNumber ? currentNumber + '.' : '0.';
    }
}
function updateDisplay() {
    if (currentNumber) {
        screen2.textContent = currentNumber;
    } else {
        screen2.textContent = '0';
    }
    if (lastOpText) {
        screen1.textContent = lastOpText;
        screen2.textContent = currentNumber;
    } else if (previousNumber && opSign) {
        screen1.textContent = `${previousNumber} ${opSign}`;
    } else {
        screen1.textContent = '';
    }
} 

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('no')) {
        handleNumber(e.target);
        updateDisplay()
    } else if (e.target.classList.contains('op')) {
        handleOperator(e.target);
        updateDisplay()
    } else if (e.target.classList.contains('calc')) {
        handleEquals();
        updateDisplay()
    } else if (e.target.classList.contains('clearBtn')) {
        handleClear();
        updateDisplay()
    } else if (e.target.classList.contains('deleteBtn')) {
        handleDelete();
        updateDisplay()
    } else if (e.target.classList.contains('point')) {
        handleDecimal()
        updateDisplay()
    } else null;
})

// keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        handleNumber({ textContent: key });
        updateDisplay();
    }
    if (key === '.') {
        handleDecimal();
        updateDisplay();
    }
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        let symbol = key;
        if (key === '*') symbol = 'x';
        if (key === '/') symbol = '÷';
        handleOperator({ textContent: symbol });
        updateDisplay();
    }
    if (key === '=' || key === 'Enter') {
        handleEquals();
        updateDisplay();
    }
    if (key === 'Escape') {
        handleClear();
        updateDisplay();
    }
    if (key === 'Backspace') {
        handleDelete();
        updateDisplay();
    }
});