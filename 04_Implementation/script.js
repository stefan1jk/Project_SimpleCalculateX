const display = document.getElementById("display");
let displayStr = "0";

function updateDisplay() {
    display.value = displayStr;
}

function setError() {
    display.classList.add("error");
}

function clearError() {
    display.classList.remove("error");
}

function calculate() {
    try {
        let expression = displayStr;
        let result = eval(expression);

        if (result === Infinity || result === -Infinity || isNaN(result)) {
            displayStr = "Error";
            setError();
        } else {
            if (!Number.isInteger(result)) {
                result = parseFloat(result.toFixed(3));
            }

            displayStr = result.toString();
        }

        updateDisplay();
    } catch (error) {
        displayStr = "Error";
        updateDisplay();
        setError();
    }
}


document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const exp = btn.dataset.expression;

        if (display.classList.contains("error")) {
            clearError();
            displayStr = "0";
        }

        if (action === "clear") {
            displayStr = "0";
            clearError();
            updateDisplay();
            return;
        }

        if (action === "backspace") {
            if (displayStr.length > 1) {
                displayStr = displayStr.slice(0, -1);
            } else {
                displayStr = "0";
            }
            updateDisplay();
            return;
        }

        if (action === "equals") {
            calculate();   
            return;
        }

        if (exp) {
            if (displayStr === "0" || displayStr === "Error") {
                displayStr = exp;
            } else {
                displayStr += exp;
            }
            updateDisplay();
        }
    });
});
