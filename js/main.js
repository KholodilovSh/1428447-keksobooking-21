"use strict";

(function () {

  const pinMainLocation = {
    x: null,
    y: null
  };

  const initSite = () => {

    window.form.initiate();

    // блокируем страницу
    toggleState(true);

    // Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main, являющейся контролом указания адреса объявления. Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние. Событие mousedown должно срабатывать только при нажатии основной кнопки мыши (обычно — левая).
    window.map.pinMain.addEventListener(`mousedown`, window.map.onMainPinClick);

    window.map.pinMain.addEventListener(`mousedown`, onMainPinClickToggleState);
  };

  const onMainPinClickToggleState = () => {
    toggleState(false);
    window.map.pinMain.removeEventListener(`mousedown`, onMainPinClickToggleState);

    window.move.listenMainPin();
  };

  const toggleState = (toggle) => {
    window.map.toggle(toggle);
    window.form.toggle(toggle);
  };

  window.main = {
    pinMainLocation,
    initSite
  };

  pinMainLocation.x = window.map.pinMain.style.left;
  pinMainLocation.y = window.map.pinMain.style.top;

  window.addEventListener(`load`, initSite);
})();
