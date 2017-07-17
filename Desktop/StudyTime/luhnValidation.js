//this function doubles a number, if the doubled number is 10 or greater, it adds the individual digits together//
function doubleDigitValue (int) {
  let doubledDigit = int *2;
  let digitToSum = 0;
  
  if (doubledDigit < 9) {
    digitToSum = doubledDigit;
  } else { //doubledDigit is greater than 9 
    digitToSum = 1 + doubledDigit % 10;
  }
  
  return digitToSum;
}


//this function splits a string of numbers into an array to be accessed later//
function splitDigits () {
  let idNum = prompt("Enter an identification number here:");
  let idNumToArray= [];
  for (let i = 0; i < idNum.length; i++) {
    idNumToArray.push(parseInt(idNum[i]));
  }
  
  return idNumToArray;
}

//this function doubles correct digits and checkes against last digit per Luhn Checksum Validation/

function luhnValidation() {
  let originalArr = splitDigits();
  let toSumArr = [];
  
  if(originalArr.length % 2 === 0) {
    for(let i = 0; i < originalArr.length - 1; i++) {
      if(i % 2 === 0) {
        toSumArr.push(doubleDigitValue(originalArr[i]));
      } else {
        toSumArr.push(originalArr[i]);
      }
    }
  } else {
    for (let j = 0; j < originalArr.length - 1; j++) {
      if(j % 2 !== 0) {
        toSumArr.push(doubleDigitValue(originalArr[j]));
      } else {
        toSumArr.push(originalArr[j]);
      }
    }
  }

  let finalSum = toSumArr.reduce(function (a, b) {
    return a + b;
  }, 0);

  if((finalSum + originalArr[(originalArr.length-1)]) % 10 === 0) {
    return "Valid ID";
  } else {
    return "Invalid ID";
  }
}

luhnValidation();