//DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

//Event Listeners
generateEl.addEventListener('click', function checkSettings() {
  const length = parseInt(lengthEl.value); //could use unary operator "+" as parseInt
  const hasLower = lowercaseEl.checked; //.checked to confirm true/false status of box checked
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

//Generate Password Function
function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = '';

  const typesCount = upper + lower + number + symbol; //to count number of checked items

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    //made an array of objects to filter out false values from array based on Object.values
    checkedItem => Object.values(checkedItem)[0]
  );
  //To only produce a password based on the checked items:
  if (typesCount === 0) {
    return '';
  }
  //To loop over length while generating for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  //Password Length Alert
  if (finalPassword.length < 8 || finalPassword.length > 128) {
    alert('Your password must be between 8-128 characters long!');
  }

  return finalPassword;
}

//Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});

//Generator Functions -- http://www.net-comber.com/charset.html

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*()-_<>{}[].,/?:;';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
