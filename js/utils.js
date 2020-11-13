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

  const errorHandler = function (errorMessage, onLoad) {
    const node = window.server.errorTemplate.cloneNode(true);
    const pTag = node.querySelector(`p`);
    pTag.textContent = errorMessage;

    const onEscapeCloseError = function (evt) {
      if (evt.key === `Escape`) {
        onCloseError();
      }
    };

    const onCloseError = function () {
      node.remove();
      window.removeEventListener(`keydown`, onEscapeCloseError);
      window.removeEventListener(`click`, onCloseError);
    };

    const buttonTag = node.querySelector(`button`);
    buttonTag.addEventListener(`click`, function () {
      node.remove();
      window.server.load(onLoad, window.utils.errorHandler);
    });

    window.addEventListener(`keydown`, onEscapeCloseError);
    window.addEventListener(`click`, onCloseError);

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const successHandler = function () {
    const node = window.server.successTemplate.cloneNode(true);

    const onEscapeCloseSuccess = function (evt) {
      if (evt.key === `Escape`) {
        onCloseSuccess();
      }
    };

    const onCloseSuccess = function () {
      node.remove();
      window.removeEventListener(`keydown`, onEscapeCloseSuccess);
      window.removeEventListener(`click`, onCloseSuccess);
      window.form.reinitForm();
    };

    window.addEventListener(`keydown`, onEscapeCloseSuccess);
    window.addEventListener(`click`, onCloseSuccess);

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.utils = {
    errorHandler,
    successHandler,
    getRandomNumber,
    getRandomFromRange,
    getRandomFromArray
  };
})();
