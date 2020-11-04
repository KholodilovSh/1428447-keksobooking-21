"use strict";

(function () {

  const PIN_HEIGHT = 165;
  const PIN_WIDTH_HALF = 25;
  const BUTTON_STYLE_LEFT = 570;
  const BUTTON_STYLE_TOP = 375;
  const MAFFIN_MIDDLE = 33;

  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);

  let jsPins;

  const getAddress = function (x = BUTTON_STYLE_LEFT, y = BUTTON_STYLE_TOP) {
    return {
      x: x + MAFFIN_MIDDLE,
      y: y + MAFFIN_MIDDLE
    };
  };

  const showAddress = function (location) {
    return `${location.x},${location.y}`;
  };

  const toggleMap = function (disabledState) {
    // а форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
    mapFilters.disabled = disabledState;
    for (let i = 0; i < mapFilters.children.length; i++) {
      mapFilters.children[i].disabled = disabledState;
    }
  };

  const showPins = function () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < jsPins.length; i++) {
      fragment.appendChild(renderPin(jsPins[i], i));
    }
    mapPins.appendChild(fragment);
  };

  const renderPin = function (pin) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = `${pin.location.x - PIN_WIDTH_HALF}px`;
    pinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;
    pinElement.addEventListener(`click`, function () {
      if (!map.querySelector(`.map__card`)) {
        map.insertBefore(window.card.renderCard(pin), mapFiltersContainer);
      }
    });

    const imgElement = pinElement.querySelector(`img`);
    imgElement.src = pin.author.avatar;
    imgElement.alt = pin.offer.description;

    return pinElement;
  };

  const successHandler = function (data) {
    jsPins = data;
    showPins();
  };

  const onClickShowPins = function () {
    map.classList.remove(`map--faded`);

    window.server.load(successHandler, window.utils.errorHandler);

    mapPinMain.removeEventListener(`mousedown`, onClickShowPins);
  };

  window.map = {
    MAFFIN_MIDDLE,
    map,
    mapPinMain,
    getAddress,
    onClickShowPins,
    showAddress,
    toggleMap
  };
})();
