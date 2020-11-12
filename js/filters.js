"use strict";

(function () {

  const SHOW_FILTERS = true;
  const HIDE_FILTERS = false;
  const PriceRanges = {
    LOW_MIDDLE: 10000,
    MIDDLE_HIGH: 50000
  };

  const typeFilter = window.map.mapFilters.querySelector(`#housing-type`);
  const priceFilter = window.map.mapFilters.querySelector(`#housing-price`);
  const roomsFilter = window.map.mapFilters.querySelector(`#housing-rooms`);
  const guestsFilter = window.map.mapFilters.querySelector(`#housing-guests`);

  const featuresFilters = window.map.mapFilters.querySelector(`#housing-features`);
  const arrayCheckBox = featuresFilters.querySelectorAll(`.map__checkbox`);

  const filterByChecks = function (pin) {
    let toShow = true;
    for (let i = 0; i < arrayCheckBox.length; i++) {
      if (arrayCheckBox[i].checked && !pin.offer.features.includes(arrayCheckBox[i].value)) {
        toShow = false;
        break;
      }
    }
    return toShow;
  };

  const filterByType = function (pin) {
    return (typeFilter.value === `any` || typeFilter.value === pin.offer.type);
  };

  const filterByRooms = function (pin) {
    return (roomsFilter.value === `any` || +roomsFilter.value === pin.offer.rooms);
  };

  const filterByGuests = function (pin) {
    return (guestsFilter.value === `any` || +guestsFilter.value === pin.offer.guests);
  };

  const filterByPrice = function (pin) {
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

  const filterPins = function () {
    const filteredPins = [];

    window.card.onCloseCard();

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

  const showFilters = function (toggle) {
    window.map.mapFilters.style.visibility = (toggle) ? `visible` : `hidden`;
  };

  const initFilters = function () {
    resetFilters();
    window.map.mapFilters.addEventListener(`change`, onChangeFilter);
  };

  const resetFilters = function () {
    typeFilter.value = `any`;
    roomsFilter.value = `any`;
    priceFilter.value = `any`;
    guestsFilter.value = `any`;
    for (let i = 0; i < arrayCheckBox.length; i++) {
      arrayCheckBox[i].checked = false;
    }
  };

  const onChangeFilter = function () {

    window.debounce.useDebounce(onUseDebounce);

  };

  const onUseDebounce = function () {
    window.map.showPins(filterPins());
  };

  window.filters = {
    SHOW_FILTERS,
    HIDE_FILTERS,
    initFilters,
    showFilters,
    filterPins
  };
})();
