document.addEventListener('DOMContentLoaded', () => {
  const calculatorScreen = document.querySelector('#calculator-screen');
  const calculatorKeys = document.querySelector('.calculator-keys');
  let currentInput = '';
  let operator = '';
  let previousInput = '';
  
  calculatorKeys.addEventListener('click', (event) => {
      const { target } = event;
      const { value } = target;

      if (!target.matches('button')) {
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
              handleOperator(value);
              break;
          case '=':
              handleEqualSign();
              break;
          case 'all-clear':
              handleAllClear();
              break;
          default:
              handleNumber(value);
      }

      updateScreen();
  });

  const handleNumber = (num) => {
      if (currentInput === '' && operator === '') {
          currentInput = num;
      } else {
          currentInput += num;
      }
  };

  const handleOperator = (op) => {
      if (operator === '') {
          operator = op;
          previousInput = currentInput;
          currentInput = '';
      } else {
          handleEqualSign();
          operator = op;
      }
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
              result = Math.sqrt(current);
              break;
          case 'sin':
              result = Math.sin((current * Math.PI) / 180);
              break;
          case 'cos':
              result = Math.cos((current * Math.PI) / 180);
              break;
          case 'tan':
              result = Math.tan((current * Math.PI) / 180);
              break;
          default:
              return;
      }

      currentInput = result.toString();
      operator = '';
      previousInput = '';
  };

  const handleAllClear = () => {
      currentInput = '';
      operator = '';
      previousInput = '';
  };

  const updateScreen = () => {
      calculatorScreen.value = currentInput;
  };
});


document.getElementById('exit').addEventListener('click', function() {
    window.close();
});
