"use strict";

const initSite = function () {

  window.form.initForm();

  // блокируем страницу
  toggleState(true);

  // Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main, являющейся контролом указания адреса объявления. Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние. Событие mousedown должно срабатывать только при нажатии основной кнопки мыши (обычно — левая).
  window.map.mapPinMain.addEventListener(`mousedown`, window.map.onClickShowPins);

  window.map.mapPinMain.addEventListener(`mousedown`, onClickToggleState);
};

const onClickToggleState = function () {
  toggleState(false);
  window.map.mapPinMain.removeEventListener(`mousedown`, onClickToggleState);

  window.move.moveMainPin();
};

const toggleState = function (toggle) {
  window.map.toggleMap(toggle);
  window.form.toggleForm(toggle);
};

window.main = {
  initSite
};

window.addEventListener(`load`, initSite);
