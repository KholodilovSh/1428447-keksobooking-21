"use strict";

(function () {

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

  const toggleFilters = function (toggle) {
    window.map.mapFilters.style.visibility = (toggle) ? `visible` : `hidden`;

    if (toggle) {
      typeFilter.addEventListener(`change`, onChangeFilter);
    } else {
      typeFilter.removeEventListener(`change`, onChangeFilter);
    }
  };

  const onChangeFilter = function () {
    window.map.showPins(filterPins());
    window.form.toggleForm(true);
  };

  window.filters = {
    toggleFilters,
    filterByType,
    filterPins
  };
})();
