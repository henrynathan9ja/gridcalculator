
const clear = document.getElementById("clr");
const del = document.getElementById("del");
const equals = document.getElementById("equals");
const percentage = document.querySelector(".perc");
const dot = document.querySelector(".dot");

const keys = Array.from(document.querySelectorAll(".key"));
const operators = Array.from(document.querySelectorAll(".operator"));


keys.forEach(key => {
    key.addEventListener("click", e => {
        if (calculator.result.textContent != "") {
            calculator.contCalc = calculator.result.textContent;

            calculator.keyDisplayer.textContent += e.target.textContent;
            calculator.enclosed.style.display = "flex";

            calculator.result.textContent = "";
        } else {
            clearInterval(calculator.interval);
            calculator.flashBar.classList.add("flashBar");
            calculator.keyDisplayer.textContent += e.target.textContent; 
            calculator.enclosed.style.display = "flex";
        }
    });
});
 
operators.forEach(operator => {
    operator.addEventListener("click", e => {
        clearInterval(calculator.flashBarIndicator);
        calculator.flashBar.classList.add("flashBar");

        if (calculator.result.textContent != "") {
            calculator.contCalc = calculator.result.textContent;
            calculator.result.style.display = "none";

            calculator.keyDisplayer.textContent = `${calculator.contCalc + e.target.textContent}`;
        } else {
            calculator.keyDisplayer.textContent += e.target.textContent;
        }

        calculator.enclosed.style.display = "flex";
    });
});

clear.addEventListener("click", () => {
    if ((calculator.result.textContent != "") || (calculator.keyDisplayer.textContent != "")) {
        calculator.clear();
        calculator.enclosed.style.display = "flex";
    } 
});

del.addEventListener("click", () => {
    calculator.delete();
});

equals.addEventListener("click", () => {
    calculator.calculate();
});

percentage.addEventListener("click", () => {
    calculator.calcPerc();
});

dot.addEventListener("click", () => {
    if (!calculator.keyDisplayer.textContent.includes(".")) {
        calculator.keyDisplayer.textContent += dot.textContent;
    }
});


class Calculator {
    constructor () {
        this.result = document.getElementById("result");
        this.enclosed = document.querySelector(".enclosed");
        this.keyDisplayer = document.querySelector(".keyDisplayer");
        this.flashBar = document.querySelector(".flashingBar");
        this.contCalc = null;
        this.clear();
    }
    flashBarIndicator () {
        this.interval = setInterval(() => {
            this.flashBar.classList.toggle("flashBar");
        }, 500);
    }
    clear () {
        this.keyDisplayer.textContent = "";
        this.result.textContent = "";
        this.flashBarIndicator();
    }
    delete () {

        if ((this.keyDisplayer.textContent != "")) {
            this.keyDisplayer.textContent = this.keyDisplayer.textContent.slice(0, -1);
        } else {
            this.result.textContent = this.result.textContent.slice(0, -1);
        }
    }
    calculate () {

        if (this.result.textContent != "") {
            this.contCalc = this.result.textContent;

            try {
            this.result.textContent = eval(this.keyDisplayer.textContent);

            this.keyDisplayer.textContent = "";
            this.enclosed.style.display = "none";
            this.result.style.display = "block";
            } catch (error)  {
                this.result.textContent = "Error";
            }
        } else {
            try {
            this.result.textContent = eval(this.keyDisplayer.textContent);
            this.keyDisplayer.textContent = "";
            this.enclosed.style.display = "none";
            this.result.style.display = "block";
            } catch (error) {
                this.result.textContent = "Error";
            }
        }

    }
    calcPerc () {
        if  (this.keyDisplayer.textContent) {
            this.result.textContent = this.keyDisplayer.textContent/100;
            this.keyDisplayer.textContent = "";
            this.flashBarIndicator();
        } else {
            this.result.textContent = this.result.textContent/100;
            this.keyDisplayer.textContent = "";
        }
    }
}

const calculator = new Calculator();
