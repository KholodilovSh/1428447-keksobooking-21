"use strict";

(() => {
  // (function () {

  const SHOW = true;
  const HIDE = false;
  const PriceRanges = {
    LOW_MIDDLE: 10000,
    MIDDLE_HIGH: 50000
  };

  const typeFilter = window.map.filters.querySelector(`#housing-type`);
  const priceFilter = window.map.filters.querySelector(`#housing-price`);
  const roomsFilter = window.map.filters.querySelector(`#housing-rooms`);
  const guestsFilter = window.map.filters.querySelector(`#housing-guests`);

  const featuresFilters = window.map.filters.querySelector(`#housing-features`);
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

    for (let i = 0, j = 0; i < window.map.jsPins.length && j < window.map.PINS_NO_MORE; i++) {
      if (filterByType(window.map.jsPins[i]) &&
      filterByRooms(window.map.jsPins[i]) &&
      filterByGuests(window.map.jsPins[i]) &&
      filterByPrice(window.map.jsPins[i]) &&
      filterByChecks(window.map.jsPins[i])) {

        filteredPins.push(window.map.jsPins[i]);
        j++;
      }
    }

    return filteredPins;
  };

  const show = (toggle) => {
    window.map.filters.style.visibility = (toggle) ? `visible` : `hidden`;
  };

  const initiate = () => {
    resetFilters();
    window.map.filters.addEventListener(`change`, onChangeFilter);
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
    window.map.showPins(filterPins());
  };

  window.filters = {
    SHOW,
    HIDE,
    initiate,
    show,
    filterPins
  };
})();
