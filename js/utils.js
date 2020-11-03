"use strict";

(function () {

  const getRandomNumber = function (minNumber = 0, maxNumber = 100, roundDigit = 0) {
    return minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);
  };

  const getRandomFromRange = function (arrayRange) {
    return getRandomNumber(...arrayRange);
  };

  const getRandomFromArray = function (arrayItems) {
    return arrayItems[getRandomNumber(0, arrayItems.length - 1)];
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.utils = {
    errorHandler,
    getRandomNumber,
    getRandomFromRange,
    getRandomFromArray
  };
})();
