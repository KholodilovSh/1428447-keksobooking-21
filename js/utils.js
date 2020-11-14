"use strict";

(function () {

  const getRandomNumber = (minNumber = 0, maxNumber = 100, roundDigit = 0) => {
    return minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);
  };

  const getRandomFromRange = (arrayRange) => {
    return getRandomNumber(...arrayRange);
  };

  const getRandomFromArray = (arrayItems) => {
    return arrayItems[getRandomNumber(0, arrayItems.length - 1)];
  };

  const onError = (errorMessage, onLoad) => {
    const node = window.server.errorTemplate.cloneNode(true);
    const pTag = node.querySelector(`p`);
    pTag.textContent = errorMessage;

    const onEscapeCloseError = (evt) => {
      if (evt.key === `Escape`) {
        onCloseError();
      }
    };

    const onCloseError = () => {
      node.remove();
      window.removeEventListener(`keydown`, onEscapeCloseError);
      window.removeEventListener(`click`, onCloseError);
    };

    const buttonTag = node.querySelector(`button`);
    buttonTag.addEventListener(`click`, () => {
      node.remove();
      window.server.load(onLoad, window.utils.onError);
    });

    window.addEventListener(`keydown`, onEscapeCloseError);
    window.addEventListener(`click`, onCloseError);

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onSuccess = () => {
    const node = window.server.successTemplate.cloneNode(true);

    const onEscapeCloseSuccess = (evt) => {
      if (evt.key === `Escape`) {
        onCloseSuccess();
      }
    };

    const onCloseSuccess = () => {
      node.remove();
      window.removeEventListener(`keydown`, onEscapeCloseSuccess);
      window.removeEventListener(`click`, onCloseSuccess);
      window.form.reinitiate();
    };

    window.addEventListener(`keydown`, onEscapeCloseSuccess);
    window.addEventListener(`click`, onCloseSuccess);

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.utils = {
    onError,
    onSuccess,
    getRandomNumber,
    getRandomFromRange,
    getRandomFromArray
  };
})();
