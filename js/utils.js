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

  window.utils = {
    getRandomNumber,
    getRandomFromRange,
    getRandomFromArray
  };
})();
