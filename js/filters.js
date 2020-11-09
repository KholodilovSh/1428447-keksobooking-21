"use strict";

(function () {

  const SHOW_FILTERS = true;
  const HIDE_FILTERS = false;

  const typeFilter = window.map.mapFilters.querySelector(`.map__filter--js-type`);

  const filterByType = function (pin) {
    return (typeFilter.value === `any` || typeFilter.value === pin.offer.type);
  };

  const filterPins = function () {
    const filteredPins = [];
    for (let i = 0; i < window.map.jsPins.length; i++) {
      if (filterByType(window.map.jsPins[i])) {
        filteredPins.push(window.map.jsPins[i]);
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
