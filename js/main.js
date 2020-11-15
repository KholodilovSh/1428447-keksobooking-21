"use strict";

(() => {
  // (function () {

  const pinMainLocation = {
    x: null,
    y: null
  };

  const initSite = () => {

    window.form.initiate();

    // блокируем страницу
    toggleState(true);

    // Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main, являющейся контролом указания адреса объявления. Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние. Событие mousedown должно срабатывать только при нажатии основной кнопки мыши (обычно — левая).
    window.mapmodule.pinMain.addEventListener(`mousedown`, window.mapmodule.onMainPinClick);

    window.mapmodule.pinMain.addEventListener(`mousedown`, onMainPinClickToggleState);
  };

  const onMainPinClickToggleState = () => {
    toggleState(false);
    window.mapmodule.pinMain.removeEventListener(`mousedown`, onMainPinClickToggleState);

    window.move.listenMainPin();
  };

  const toggleState = (toggle) => {
    window.mapmodule.toggle(toggle);
    window.form.toggle(toggle);
  };

  window.main = {
    pinMainLocation,
    initSite
  };

  pinMainLocation.x = window.mapmodule.pinMain.style.left;
  pinMainLocation.y = window.mapmodule.pinMain.style.top;

  window.addEventListener(`load`, initSite);
})();
