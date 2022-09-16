let a = '';
let b = '';
let firstNum = false;
let operator = '';
let finish = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['%', '/', 'x', '-', '+'];
const result = document.getElementById('display');

const clearAll = () => {
  a = '';
  b = '';
  operator = '';
  finish = false;
  firstNum = false;
  result.textContent = '0';
};

document.querySelector('.buttons').addEventListener('click', (event) => {
  if (!event.target.classList.contains('button')) return;
  const key = event.target.textContent;
  if (key === '%') {
    a = a / 100;
    if (a < 0.00000001) {
      a = '';
      result.textContent = '0';
      return
    }
    result.textContent = Number(a).toFixed(8);
    return
  }
  if (event.target.id === 'ac') clearAll();
  if (event.target.id === 'ce') {
    if (b === '' && operator === '') {
      a = Math.floor(a / 10);
      if (a === 0) {
        a = '';
        result.textContent = '0';
        return
      }
      result.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      result.textContent = b;
    } else {
      b = Math.floor(b / 10);
      if (b === 0) {
        b = '';
        result.textContent = '0';
        return
      }
      result.textContent = b;
    }
    return
  }

  if (digits.includes(key)) {
    if (b === '' && operator === '') {
      if (!firstNum && key === '0') {
        a = '';
      } else {
        if (a.length >= 15) {
          return
        }
        if (operator === '.' && a === '') {
          a = '0.1'
        } else {
          a += key;
        }
        firstNum = true;
        result.textContent = a
      }
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      result.textContent = b;
    } else {
      if (b.length >= 15) {
        return
      }
      b += key;
      result.textContent = b;
    }
    return
  }

  if (operators.includes(key)) {
    operator = key;
    result.textContent = key;
    return
  }

  if (key === '=') {
    if (b === '') b = a;
    switch (operator) {
      case "+":
        a = Number(a) + Number(b);
        break;
      case "-":
        a = a - b;
        break;
      case "x":
        a = a * b;
        break;
      case "%":
        a = a / 100;
        break;
      case "/":
        if (b === '0') {
          result.textContent = 'Error';
          a = '';
          b = '';
          operator = "";
          return
        }
        a = a / b;
        break;
    }
    finish = true;
    if (a < 0.00000001) {
      a = '';
      result.textContent = '0';
      return
    }
    console.log('a', a)
    console.log('b', b)
    console.log('operator', operator)
    result.textContent = Number(a).toFixed(8);
  }
})

