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
  const wifiFilter = featuresFilters.querySelector(`#filter-wifi`);
  const dishwasherFilter = featuresFilters.querySelector(`#filter-dishwasher`);
  const parkingFilter = featuresFilters.querySelector(`#filter-parking`);
  const washerFilter = featuresFilters.querySelector(`#filter-washer`);
  const elevatorFilter = featuresFilters.querySelector(`#filter-elevator`);
  const conditionerFilter = featuresFilters.querySelector(`#filter-conditioner`);

  const filterByWifi = function (pin) {
    return filterByFeature(pin, wifiFilter, `wifi`);
  };

  const filterByDishwasher = function (pin) {
    return filterByFeature(pin, dishwasherFilter, `dishwasher`);
  };

  const filterByParking = function (pin) {
    return filterByFeature(pin, parkingFilter, `parking`);
  };

  const filterByWasher = function (pin) {
    return filterByFeature(pin, washerFilter, `washer`);
  };

  const filterByElevator = function (pin) {
    return filterByFeature(pin, elevatorFilter, `elevator`);
  };

  const filterByConditioner = function (pin) {
    return filterByFeature(pin, conditionerFilter, `conditioner`);
  };

  const filterByFeature = function (pin, featureCheckBox, word) {
    return (!featureCheckBox.checked) || pin.offer.features.includes(word);
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
      filterByWifi(window.map.jsPins[i]) &&
      filterByDishwasher(window.map.jsPins[i]) &&
      filterByParking(window.map.jsPins[i]) &&
      filterByWasher(window.map.jsPins[i]) &&
      filterByElevator(window.map.jsPins[i]) &&
      filterByConditioner(window.map.jsPins[i])) {

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
    window.map.mapFilters.addEventListener(`change`, onChangeFilter);
  };

  const onChangeFilter = function () {

    window.debounce.useDebounce(onUseDebounce);

  };

  const onUseDebounce = function () {
    window.map.showPins(filterPins());
    window.form.toggleForm(true);
  };

  window.filters = {
    SHOW_FILTERS,
    HIDE_FILTERS,
    initFilters,
    showFilters,
    filterByType,
    filterPins
  };
})();
