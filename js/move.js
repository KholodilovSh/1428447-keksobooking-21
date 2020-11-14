"use strict";

(function () {

  const listenMainPin = () => {
    window.map.pinMain.addEventListener(`mousedown`, onMouseDown);
  };

  const onMouseDown = (downEvt) => {
    downEvt.preventDefault();

    let startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    const isPinOnMap = (location) => {
      return (
        window.data.RANGE_X[0] <= location.x &&
        window.data.RANGE_X[1] >= location.x
        &&
        window.data.RANGE_Y[0] <= location.y &&
        window.data.RANGE_Y[1] >= location.y);
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      const nextX = window.map.pinMain.offsetLeft - shift.x;
      const nextY = window.map.pinMain.offsetTop - shift.y;

      const pinLocation = window.map.getAddress(nextX, nextY);

      const pinOnMap = isPinOnMap(pinLocation);

      if (pinOnMap) {
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.pinMain.style.top = nextY + `px`;
        window.map.pinMain.style.left = nextX + `px`;
        window.form.adAddress.value = window.map.showAddress(pinLocation);
      }
    };

    const onMoueUp = (upEvt) => {
      if (upEvt) {
        upEvt.preventDefault();
      }

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMoueUp);

    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMoueUp);
  };

  window.move = {
    listenMainPin
  };
})();
