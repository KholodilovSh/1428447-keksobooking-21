"use strict";

(function () {

  const PINS_NO_MORE = 5;
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

  const showPins = function (filteredPins) {

    const fragment = document.createDocumentFragment();

    clearPins();

    for (let i = 0; i < filteredPins.length; i++) {

      fragment.appendChild(renderPin(filteredPins[i], i));

    }
    mapPins.appendChild(fragment);
  };

  const clearPins = function () {
    const pins = mapPins.children;
    for (let i = pins.length - 1; i >= 2; i--) {
      pins[i].remove();
    }
  };

  const renderPin = function (pin) {
    const pinNode = pinTemplate.cloneNode(true);
    pinNode.style.left = `${pin.location.x - PIN_WIDTH_HALF}px`;
    pinNode.style.top = `${pin.location.y - PIN_HEIGHT}px`;
    pinNode.addEventListener(`click`, function () {
      if (map.querySelector(`.map__card`)) {
        window.card.onCloseCard();
      }
      map.insertBefore(window.card.renderCard(pin), mapFiltersContainer);
    });

    const imgTag = pinNode.querySelector(`img`);
    imgTag.src = pin.author.avatar;
    imgTag.alt = pin.offer.description;

    return pinNode;
  };

  const onSuccess = function (data) {
    window.filters.initFilters();
    window.filters.showFilters(window.filters.SHOW_FILTERS);
    window.map.jsPins = data;
    showPins(window.filters.filterPins());
  };

  const onClickShowPins = function () {

    window.filters.showFilters(window.filters.HIDE_FILTERS);
    map.classList.remove(`map--faded`);

    window.server.load(onSuccess, window.utils.onError);

    mapPinMain.removeEventListener(`mousedown`, onClickShowPins);
  };

  window.map = {
    MAFFIN_MIDDLE,
    PINS_NO_MORE,
    jsPins,
    map,
    mapFilters,
    mapPinMain,
    clearPins,
    getAddress,
    onClickShowPins,
    showAddress,
    showPins,
    toggleMap
  };
})();
