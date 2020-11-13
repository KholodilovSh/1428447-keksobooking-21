"use strict";

(function () {

  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const renderCard = function (pin) {
    const cardNode = cardTemplate.cloneNode(true);

    const changeText = function (className, text) {
      const some = cardNode.querySelector(className);
      some.textContent = text;
    };

    // Выведите заголовок объявления offer.title в заголовок .popup__title.
    changeText(`.popup__title`, pin.offer.title);

    // Выведите адрес offer.address в блок .popup__text--address.
    changeText(`.popup__text--address`, pin.offer.address);


    // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь.
    // Например, 5200₽/ночь.
    // <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
    changeText(`.popup__text--price`, `${pin.offer.price}₽/ночь`);


    // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
    changeText(`.popup__type`, window.form.typesFeatures[pin.offer.type].russian);

    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
    changeText(`.popup__text--capacity`, `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`);

    // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
    changeText(`.popup__text--time`, `заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`);

    // В список .popup__features выведите все доступные удобства в объявлении.
    if (pin.offer.features.length === 0) {

      cardNode.querySelector(`.popup__features`).remove();

    } else {

      const setOfFeatures = cardNode.querySelector(`.popup__features`).children;
      const classFeatures = [];

      for (let i = 0; i < pin.offer.features.length; i++) {
        classFeatures.push(`popup__feature--${pin.offer.features[i]}`);
      }

      for (let i = setOfFeatures.length - 1; i >= 0; i--) {
        const child = setOfFeatures[i];
        let noFeature = true;
        for (let j = 0; j < classFeatures.length; j++) {
          if (child.classList.contains(classFeatures[j])) {
            noFeature = false;
            break;
          }
        }
        if (noFeature) {
          setOfFeatures[i].remove();
        }
      }
    }

    // В блок .popup__description выведите описание объекта недвижимости offer.description.
    changeText(`.popup__description`, pin.offer.description);

    // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
    const popupGallery = cardNode.querySelector(`.popup__photos`);

    if (pin.offer.photos.length === 0) {

      popupGallery.remove();

    } else {

      const popupPhoto = popupGallery.querySelector(`.popup__photo`).cloneNode(true);
      popupGallery.children[0].remove();

      for (let i = 0; i < pin.offer.photos.length; i++) {
        const tempPhoto = popupPhoto.cloneNode(true);
        tempPhoto.src = pin.offer.photos[i];
        popupGallery.appendChild(tempPhoto);
      }
    }

    // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
    const popupAvatar = cardNode.querySelector(`.popup__avatar`);
    popupAvatar.src = pin.author.avatar;

    const closePopup = cardNode.querySelector(`.popup__close`);
    closePopup.addEventListener(`click`, onCloseCard);

    document.addEventListener(`keydown`, onEscapeCloseCard);

    return cardNode;
  };

  const onEscapeCloseCard = function (evt) {
    if (evt.key === `Escape`) {
      onCloseCard();
    }
  };

  const onCloseCard = function () {
    const cardToRemove = window.map.map.querySelector(`.map__card`);
    if (cardToRemove) {
      window.map.activePin.classList.remove(`map__pin--active`);
      window.map.activePin = null;
      cardToRemove.remove();
      document.removeEventListener(`keydown`, onEscapeCloseCard);
    }
  };

  window.card = {
    onCloseCard,
    renderCard
  };
})();
