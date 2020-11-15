"use strict";

const SHOW = true;
const HIDE = false;
const PriceRanges = {
  LOW_MIDDLE: 10000,
  MIDDLE_HIGH: 50000
};

const typeFilter = window.mapModule.filters.querySelector(`#housing-type`);
const priceFilter = window.mapModule.filters.querySelector(`#housing-price`);
const roomsFilter = window.mapModule.filters.querySelector(`#housing-rooms`);
const guestsFilter = window.mapModule.filters.querySelector(`#housing-guests`);

const featuresFilters = window.mapModule.filters.querySelector(`#housing-features`);
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
    case `any`:
      return true;
    case `low`:
      return pin.offer.price <= PriceRanges.LOW_MIDDLE;
    case `middle`:
      return pin.offer.price > PriceRanges.LOW_MIDDLE && pin.offer.price <= PriceRanges.MIDDLE_HIGH;
    case `high`:
      return pin.offer.price > PriceRanges.MIDDLE_HIGH;
  }
  return null;
};

const filterPins = () => {
  const filteredPins = [];

  window.card.onClose();

  for (let i = 0, j = 0; i < window.mapModule.jsPins.length && j < window.mapModule.PINS_NO_MORE; i++) {
    if (filterByType(window.mapModule.jsPins[i]) &&
      filterByRooms(window.mapModule.jsPins[i]) &&
      filterByGuests(window.mapModule.jsPins[i]) &&
      filterByPrice(window.mapModule.jsPins[i]) &&
      filterByChecks(window.mapModule.jsPins[i])) {

      filteredPins.push(window.mapModule.jsPins[i]);
      j++;
    }
  }

  return filteredPins;
};

const show = (toggle) => {
  window.mapModule.filters.style.visibility = (toggle) ? `visible` : `hidden`;
};

const initiate = () => {
  resetFilters();
  window.mapModule.filters.addEventListener(`change`, onChangeFilter);
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
  window.mapModule.showPins(filterPins());
};

window.filters = {
  SHOW,
  HIDE,
  initiate,
  show,
  filterPins
};
