"use strict";

const listenMainPin = () => {
  window.mapModule.pinMain.addEventListener(`mousedown`, onMouseDown);
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

    const nextX = window.mapModule.pinMain.offsetLeft - shift.x;
    const nextY = window.mapModule.pinMain.offsetTop - shift.y;

    const pinLocation = window.mapModule.getAddress(nextX, nextY);

    const pinOnMap = isPinOnMap(pinLocation);

    if (pinOnMap) {
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mapModule.pinMain.style.top = nextY + `px`;
      window.mapModule.pinMain.style.left = nextX + `px`;
      window.form.adAddress.value = window.mapModule.showAddress(pinLocation);
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
