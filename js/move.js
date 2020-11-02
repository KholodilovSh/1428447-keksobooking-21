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

    const isMousePointerOnMap = function (x, y) {
      return (
        window.data.RANGE_X[0] + window.map.map.offsetLeft <= x - window.map.MAFFIN_MIDDLE &&
        window.data.RANGE_X[1] + window.map.map.offsetLeft >= x - window.map.MAFFIN_MIDDLE
        &&
        window.data.RANGE_Y[0] <= y - window.map.MAFFIN_MIDDLE &&
        window.data.RANGE_Y[1] >= y - window.map.MAFFIN_MIDDLE);
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      const nextX = window.map.mapPinMain.offsetLeft - shift.x;
      const nextY = window.map.mapPinMain.offsetTop - shift.y;

      const mousePoinetrOnMap = isMousePointerOnMap(
          window.scrollX + moveEvt.clientX,
          window.scrollY + moveEvt.clientY);

      if (mousePoinetrOnMap) {
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.mapPinMain.style.top = nextY + `px`;
        window.map.mapPinMain.style.left = nextX + `px`;
        window.form.adFormAddress.value = window.map.getAddress(nextX, nextY);
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
