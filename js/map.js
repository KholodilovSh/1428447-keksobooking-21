"use strict";

(function () {

  const PINS_NO_MORE = 5;
  const PIN_HEIGHT = 165;
  const PIN_WIDTH_HALF = 25;
  const BUTTON_STYLE_LEFT = 570;
  const BUTTON_STYLE_TOP = 375;
  const MAFFIN_MIDDLE = 33;

  const map = document.querySelector(`.map`);
  const pinMain = map.querySelector(`.map__pin--main`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const filters = document.querySelector(`.map__filters`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);

  let jsPins;
  let activePin;

  const getAddress = (x = BUTTON_STYLE_LEFT, y = BUTTON_STYLE_TOP) => {
    return {
      x: x + MAFFIN_MIDDLE,
      y: y + MAFFIN_MIDDLE
    };
  };

  const showAddress = (location) => {
    return `${location.x},${location.y}`;
  };

  const toggle = (disabledState) => {
    // а форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
    filters.disabled = disabledState;
    for (let i = 0; i < filters.children.length; i++) {
      filters.children[i].disabled = disabledState;
    }
  };

  const showPins = (filteredPins) => {

    const fragment = document.createDocumentFragment();

    clearPins();

    for (let i = 0; i < filteredPins.length; i++) {

      fragment.appendChild(renderPin(filteredPins[i], i));

    }
    mapPins.appendChild(fragment);
  };

  const clearPins = () => {
    const pins = mapPins.children;
    for (let i = pins.length - 1; i >= 2; i--) {
      pins[i].remove();
    }
  };

  const renderPin = (pin) => {
    const pinNode = pinTemplate.cloneNode(true);
    pinNode.style.left = `${pin.location.x - PIN_WIDTH_HALF}px`;
    pinNode.style.top = `${pin.location.y - PIN_HEIGHT}px`;

    pinNode.addEventListener(`click`, () => {
      if (map.querySelector(`.map__card`)) {
        window.card.onClose();
      }
      window.map.activePin = pinNode;
      window.map.activePin.classList.add(`map__pin--active`);
      map.insertBefore(window.card.render(pin), mapFiltersContainer);
    });

    const imgTag = pinNode.querySelector(`img`);
    imgTag.src = pin.author.avatar;
    imgTag.alt = pin.offer.description;

    return pinNode;
  };

  const onSuccess = (data) => {
    window.filters.initiate();
    window.filters.show(window.filters.SHOW);
    window.map.jsPins = data;
    showPins(window.filters.filterPins());
  };

  const onMainPinClick = () => {

    window.filters.show(window.filters.HIDE);
    map.classList.remove(`map--faded`);

    window.server.load(onSuccess, window.utils.onError);

    pinMain.removeEventListener(`mousedown`, onMainPinClick);
  };

  window.map = {
    MAFFIN_MIDDLE,
    PINS_NO_MORE,
    activePin,
    jsPins,
    map,
    filters,
    pinMain,
    clearPins,
    getAddress,
    onMainPinClick,
    showAddress,
    showPins,
    toggle
  };
})();
