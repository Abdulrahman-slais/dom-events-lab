/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

const buttons = document.querySelectorAll('.button');

console.log(buttons)

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // This log is for testing purposes to verify we're getting the correct value
      console.log(event.target.innerText);
      // Future logic to capture the button's value would go here...
    });
  });
  
// Cached Element References
const display = document.querySelector('.display');
let currentInput = ''; // Stores the current number or operator
let previousInput = ''; // Stores the previous number
let operator = ''; // Stores the current operator

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;

    if (!isNaN(value)) {
      // If the clicked button is a number
      handleNumber(value);
    } else if (value === 'C') {
      // If the clicked button is 'C' (clear)
      clearDisplay();
    } else if (value === '=') {
      // If the clicked button is '=' (equals)
      calculateResult();
    } else {
      // If the clicked button is an operator (+, -, *, /)
      handleOperator(value);
    }
  });
});

// Functions
function handleNumber(number) {
  if (operator && previousInput && !currentInput) {
    currentInput = number; // Start fresh if operator was clicked
  } else {
    currentInput += number; // Append number to the current input
  }
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput) {
    if (previousInput) {
      // If there's already a number stored, calculate first
      calculateResult();
    }
    operator = op; // Store the operator
    previousInput = currentInput; // Move current input to previous
    currentInput = ''; // Reset current input
  }
}

function calculateResult() {
  if (previousInput && currentInput && operator) {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num2 !== 0 ? num1 / num2 : 'Error'; // Prevent division by zero
        break;
    }

    updateDisplay(result);
    previousInput = result.toString(); // Store result for next operation
    currentInput = '';
    operator = '';
  }
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay('0');
}

function updateDisplay(value) {
  display.innerText = value;
}
