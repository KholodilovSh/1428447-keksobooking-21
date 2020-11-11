"use strict";

(function () {

  const DEBOUNCE_INTERVAL = 500; // ms
  let lastTimeout;

  const useDebounce = function (doSomething) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      doSomething();
    }, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    useDebounce
  };
})();
