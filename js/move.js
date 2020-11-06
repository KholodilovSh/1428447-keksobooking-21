"use strict";

(function () {

  const moveMainPin = function () {
    window.map.mapPinMain.addEventListener(`mousedown`, onMouseDown);
  };

  const onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    let startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    const isPinOnMap = function (location) {
      return (
        window.data.RANGE_X[0] <= location.x &&
        window.data.RANGE_X[1] >= location.x
        &&
        window.data.RANGE_Y[0] <= location.y &&
        window.data.RANGE_Y[1] >= location.y);
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      const nextX = window.map.mapPinMain.offsetLeft - shift.x;
      const nextY = window.map.mapPinMain.offsetTop - shift.y;

      const pinLocation = window.map.getAddress(nextX, nextY);

      const pinOnMap = isPinOnMap(pinLocation);

      if (pinOnMap) {
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.mapPinMain.style.top = nextY + `px`;
        window.map.mapPinMain.style.left = nextX + `px`;
        window.form.adFormAddress.value = window.map.showAddress(pinLocation);
      }
    };

    const onMoueUp = function (upEvt) {
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
    moveMainPin
  };
})();
