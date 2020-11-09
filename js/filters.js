"use strict";

(function () {

  const typeFilter = window.map.mapFilters.querySelector(`.map__filter--js-type`);

  const useFilters = function (pin) {
    return (typeFilter.value === `any` || typeFilter.value === pin.offer.type);
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
    window.map.clearPins();
    window.map.showPins();
    window.form.toggleForm(true);
  };

  window.filters = {
    typeFilter,
    toggleFilters,
    useFilters
  };
})();
