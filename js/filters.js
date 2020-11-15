"use strict";

(() => {
  // (function () {

  const SHOW = true;
  const HIDE = false;
  const PriceRanges = {
    LOW_MIDDLE: 10000,
    MIDDLE_HIGH: 50000
  };

  const typeFilter = window.mapmodule.filters.querySelector(`#housing-type`);
  const priceFilter = window.mapmodule.filters.querySelector(`#housing-price`);
  const roomsFilter = window.mapmodule.filters.querySelector(`#housing-rooms`);
  const guestsFilter = window.mapmodule.filters.querySelector(`#housing-guests`);

  const featuresFilters = window.mapmodule.filters.querySelector(`#housing-features`);
  const arrayCheckBox = featuresFilters.querySelectorAll(`.map__checkbox`);

  const filterByChecks = (pin) => {
    let toShow = true;
    for (let i = 0; i < arrayCheckBox.length; i++) {
      if (arrayCheckBox[i].checked && !pin.offer.features.includes(arrayCheckBox[i].value)) {
        toShow = false;
        break;
      }
    }
    return toShow;
  };

  const filterByType = (pin) => {
    return (typeFilter.value === `any` || typeFilter.value === pin.offer.type);
  };

  const filterByRooms = (pin) => {
    return (roomsFilter.value === `any` || +roomsFilter.value === pin.offer.rooms);
  };

  const filterByGuests = (pin) => {
    return (guestsFilter.value === `any` || +guestsFilter.value === pin.offer.guests);
  };

  const filterByPrice = (pin) => {
    switch (priceFilter.value) {
      case `any` :
        return true;
      case `low` :
        return pin.offer.price <= PriceRanges.LOW_MIDDLE;
      case `middle`:
        return pin.offer.price > PriceRanges.LOW_MIDDLE && pin.offer.price <= PriceRanges.MIDDLE_HIGH;
      case `high` :
        return pin.offer.price > PriceRanges.MIDDLE_HIGH;
    }
    return null;
  };

  const filterPins = () => {
    const filteredPins = [];

    window.card.onClose();

    for (let i = 0, j = 0; i < window.mapmodule.jsPins.length && j < window.mapmodule.PINS_NO_MORE; i++) {
      if (filterByType(window.mapmodule.jsPins[i]) &&
      filterByRooms(window.mapmodule.jsPins[i]) &&
      filterByGuests(window.mapmodule.jsPins[i]) &&
      filterByPrice(window.mapmodule.jsPins[i]) &&
      filterByChecks(window.mapmodule.jsPins[i])) {

        filteredPins.push(window.mapmodule.jsPins[i]);
        j++;
      }
    }

    return filteredPins;
  };

  const show = (toggle) => {
    window.mapmodule.filters.style.visibility = (toggle) ? `visible` : `hidden`;
  };

  const initiate = () => {
    resetFilters();
    window.mapmodule.filters.addEventListener(`change`, onChangeFilter);
  };

  const resetFilters = () => {
    typeFilter.value = `any`;
    roomsFilter.value = `any`;
    priceFilter.value = `any`;
    guestsFilter.value = `any`;
    for (let i = 0; i < arrayCheckBox.length; i++) {
      arrayCheckBox[i].checked = false;
    }
  };

  const onChangeFilter = () => {

    window.debounce.use(onUseDebounce);

  };

  const onUseDebounce = () => {
    window.mapmodule.showPins(filterPins());
  };

  window.filters = {
    SHOW,
    HIDE,
    initiate,
    show,
    filterPins
  };
})();
