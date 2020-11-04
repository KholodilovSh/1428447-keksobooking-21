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
    const node = window.server.errorTemplate.cloneNode(true);
    const pElement = node.querySelector(`p`);
    pElement.textContent = errorMessage;

    const buttonElement = node.querySelector(`button`);
    buttonElement.addEventListener(`click`, function () {
      node.remove();
      window.server.load(window.map.successHandler, window.utils.errorHandler);
    });

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.utils = {
    errorHandler,
    getRandomNumber,
    getRandomFromRange,
    getRandomFromArray
  };
})();
