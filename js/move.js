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

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const nextX = window.map.mapPinMain.offsetLeft - shift.x;
      const nextY = window.map.mapPinMain.offsetTop - shift.y;

      if (window.data.RANGE_X[0] <= nextX && window.data.RANGE_X[1] >= nextX + 2 * window.map.MAFFIN_MIDDLE
        &&
        window.data.RANGE_Y[0] <= nextY && window.data.RANGE_Y[1] >= nextY) {
        window.map.mapPinMain.style.top = nextY + `px`;
        window.map.mapPinMain.style.left = nextX + `px`;
        window.form.adFormAddress.value = window.map.getAddress(nextX, nextY);
      } else {
        onMoueUp();
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
