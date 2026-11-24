const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentValue = "0";
let previousValue = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    display.value = currentValue;
}

function calculate(first, second, op) {
    first = Number(first);
    second = Number(second);

    if (op === "+") return first + second;
    if (op === "-") return first - second;
    if (op === "*") return first * second;

    if (op === "/") {
        if (second === 0) {
            return "Error";
        }

        return first / second;
    }
}

buttons.addEventListener("click", function(event) {

    const button = event.target;

    if (button.tagName !== "BUTTON") {
        return;
    }

    const number = button.dataset.number;
    const selectedOperator = button.dataset.operator;
    const action = button.dataset.action;

    // Number button
    if (number !== undefined) {

        if (currentValue === "Error") {
            currentValue = "0";
        }

        if (shouldReset) {
            currentValue = number === "." ? "0." : number;
            shouldReset = false;
        }

        else if (number === "." && currentValue.includes(".")) {
            return;
        }

        else if (number === ".") {
            currentValue += ".";
        }

        else if (currentValue === "0") {
            currentValue = number;
        }

        else {
            currentValue += number;
        }

        updateDisplay();
    }

    // Operator button
    if (selectedOperator) {

        if (currentValue === "Error") return;

        if (operator && !shouldReset) {

            const result = calculate(
                previousValue,
                currentValue,
                operator
            );

            if (result === "Error") {
                currentValue = "Error";
                previousValue = null;
                operator = null;
                shouldReset = true;
                updateDisplay();
                return;
            }

            currentValue = String(
                Number(result.toFixed(10))
            );
        }

        previousValue = currentValue;
        operator = selectedOperator;
        shouldReset = true;

        updateDisplay();
    }

    // Calculate button
    if (action === "calculate") {

        if (operator === null || shouldReset) return;

        const result = calculate(
            previousValue,
            currentValue,
            operator
        );

        currentValue = result === "Error"
            ? "Error"
            : String(Number(result.toFixed(10)));

        previousValue = null;
        operator = null;
        shouldReset = true;

        updateDisplay();
    }

    // Clear button
    if (action === "clear") {

        currentValue = "0";
        previousValue = null;
        operator = null;
        shouldReset = false;

        updateDisplay();
    }

    // Backspace button
    if (action === "backspace") {

        if (currentValue === "Error" || shouldReset) {
            currentValue = "0";
            shouldReset = false;
        }

        else {
            currentValue = currentValue.slice(0, -1);

            if (currentValue === "" || currentValue === "-") {
                currentValue = "0";
            }
        }

        updateDisplay();
    }

});