"use strict";

const pinMainLocation = {
  x: null,
  y: null
};

const initSite = () => {

  window.form.initiate();

  // блокируем страницу
  toggleState(true);

  // Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main, являющейся контролом указания адреса объявления. Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние. Событие mousedown должно срабатывать только при нажатии основной кнопки мыши (обычно — левая).
  window.mapModule.pinMain.addEventListener(`mousedown`, window.mapModule.onMainPinClick);

  window.mapModule.pinMain.addEventListener(`mousedown`, onMainPinClickToggleState);
};

const onMainPinClickToggleState = () => {
  toggleState(false);
  window.mapModule.pinMain.removeEventListener(`mousedown`, onMainPinClickToggleState);

  window.move.listenMainPin();
};

const toggleState = (toggle) => {
  window.mapModule.toggle(toggle);
  window.form.toggle(toggle);
};

pinMainLocation.x = window.mapModule.pinMain.style.left;
pinMainLocation.y = window.mapModule.pinMain.style.top;

window.addEventListener(`load`, initSite);

window.main = {
  pinMainLocation,
  initSite
};
