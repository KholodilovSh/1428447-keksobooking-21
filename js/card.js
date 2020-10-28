"use strict";

(function () {


  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const mapFilters = document.querySelector(`.map__filters`);

  const renderCard = function (pin) {
    const cardElement = cardTemplate.cloneNode(true);

    // Выведите заголовок объявления offer.title в заголовок .popup__title.
    let someElement = cardElement.querySelector(`.popup__title`);
    someElement.textContent = pin.offer.title;

    // Выведите адрес offer.address в блок .popup__text--address.
    someElement = cardElement.querySelector(`.popup__text--address`);
    someElement.textContent = pin.offer.address;

    // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь.
    // Например, 5200₽/ночь.
    // <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
    someElement = cardElement.querySelector(`.popup__text--price`);
    someElement.textContent = `${pin.offer.price}₽/ночь`;

    // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
    someElement = cardElement.querySelector(`.popup__type`);
    someElement.textContent = window.form.typesFeatures[pin.offer.type].russian;

    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
    someElement = cardElement.querySelector(`.popup__text--capacity`);
    someElement.textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;

    // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
    someElement = cardElement.querySelector(`.popup__text--time`);
    someElement.textContent = `заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;

    // В список .popup__features выведите все доступные удобства в объявлении.
    someElement = cardElement.querySelector(`.popup__features`);
    const someChildren = someElement.children;
    const classFeatures = [];
    for (let i = 0; i < pin.offer.features.length; i++) {
      classFeatures.push(`popup__feature--${pin.offer.features[i]}`);
    }

    for (let i = someChildren.length - 1; i >= 0; i--) {
      const child = someChildren[i];
      let noFeature = true;
      for (let j = 0; j < classFeatures.length; j++) {
        if (child.classList.contains(classFeatures[j])) {
          noFeature = false;
          break;
        }
      }
      if (noFeature) {
        someChildren[i].remove();
      }
    }

    // В блок .popup__description выведите описание объекта недвижимости offer.description.
    someElement = cardElement.querySelector(`.popup__description`);
    someElement.textContent = pin.offer.description;

    // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
    someElement = cardElement.querySelector(`.popup__photos`);
    const somePhoto = someElement.querySelector(`.popup__photo`).cloneNode(true);
    someElement.children[0].remove();

    for (let i = 0; i < pin.offer.photos.length; i++) {
      const tempPhoto = somePhoto.cloneNode(true);
      tempPhoto.src = pin.offer.photos[i];
      someElement.appendChild(tempPhoto);
    }

    // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
    someElement = cardElement.querySelector(`.popup__avatar`);
    someElement.src = pin.author.avatar;

    const closeElement = cardElement.querySelector(`.popup__close`);

    closeElement.addEventListener(`click`, onCloseCard);

    document.addEventListener(`keydown`, onEscapeCloseCard);

    return cardElement;
  };

  const toggleMap = function (disabledState) {
    // а форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
    mapFilters.disabled = disabledState;
    for (let i = 0; i < mapFilters.children.length; i++) {
      mapFilters.children[i].disabled = disabledState;
    }
  };

  const onEscapeCloseCard = function (evt) {
    if (evt.key === `Escape`) {
      onCloseCard();
    }
  };

  const onCloseCard = function () {
    const cardToRemove = window.main.map.querySelector(`.map__card`);
    if (cardToRemove) {
      cardToRemove.remove();
      document.removeEventListener(`keydown`, onEscapeCloseCard);
    }
  };

  window.card = {
    renderCard,
    toggleMap
  };
})();
