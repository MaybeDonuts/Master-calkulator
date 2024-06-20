document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('#calculator-screen');
    const calculatorKeys = document.querySelector('.calculator-keys');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    calculatorKeys.addEventListener('click', (event) => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        if (value === 'exit') {
            window.close();
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
            case 'sqrt':
            case 'sin':
            case 'cos':
            case 'tan':
            case '%':
                handleOperator(value);
                break;
            case '=':
                handleEqualSign();
                break;
            case 'all-clear':
                handleAllClear();
                break;
            case 'del':
                handleDelete();
                break;
            default:
                handleNumber(value);
        }

        updateScreen();
    });

    const handleNumber = (num) => {
        if (resultDisplayed) {
            currentInput = num;
            resultDisplayed = false;
        } else {
            currentInput += num;
        }
    };

    const handleOperator = (op) => {
        if (currentInput === '' && op !== 'sqrt' && op !== 'sin' && op !== 'cos' && op !== 'tan') {
            return;
        }
        if (operator !== '' && !resultDisplayed) {
            handleEqualSign();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    };

    const handleEqualSign = () => {
        if (operator === '') return;

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
            case 'sqrt':
                result = Math.sqrt(prev || current);
                break;
            case 'sin':
                result = Math.sin((prev || current) * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos((prev || current) * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan((prev || current) * Math.PI / 180);
                break;
            case '%':
                result = prev * current / 100;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        resultDisplayed = true;
    };

    const handleAllClear = () => {
        currentInput = '';
        operator = '';
        previousInput = '';
    };

    const handleDelete = () => {
        currentInput = currentInput.slice(0, -1);
    };

    const updateScreen = () => {
        calculatorScreen.value = previousInput + ' ' + operator + ' ' + currentInput;
    };
});
