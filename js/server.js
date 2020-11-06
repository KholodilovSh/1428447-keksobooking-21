"use strict";

const TIMEOUT_IN_MS = 1000;

const StatusCode = {
  OK: 200
};

const ServerUrl = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SAVE: `https://21.javascript.pages.academy/keksobooking`
};

const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

const load = function (onLoad, onError) {
  const xhr = makeRequestToServer(onLoad, onError);
  xhr.open(`GET`, ServerUrl.LOAD);
  xhr.send();
};

const save = function (data, onLoad, onError) {
  const xhr = makeRequestToServer(onLoad, onError);
  xhr.open(`POST`, ServerUrl.SAVE);
  xhr.send(data);
};

const makeRequestToServer = function (onLoad, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText, onLoad);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`, onLoad);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`, onLoad);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

window.server = {
  errorTemplate,
  successTemplate,
  load,
  save
};
