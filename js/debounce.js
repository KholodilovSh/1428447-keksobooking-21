"use strict";

(() => {
  // (function () {

  const DEBOUNCE_INTERVAL = 500; // ms
  let lastTimeout;

  const use = (doSomething) => {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      doSomething();
    }, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    use
  };
})();
