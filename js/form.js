"use strict";

(function () {

  const typesFeatures = {
    flat: {
      russian: `Квартира`,
      minPrice: 1000},
    bungalow: {
      russian: `Бунгало`,
      minPrice: 0},
    house: {
      russian: `Дом`,
      minPrice: 5000},
    palace: {
      russian: `Дворец`,
      minPrice: 10000}
  };

  const adForm = document.querySelector(`.ad-form`);

  const adFieldsets = adForm.querySelectorAll(`fieldset`);
  const adFormAddress = adForm.querySelector(`.ad-form__address`);
  const adFormType = adForm.querySelector(`.ad-form__type`);
  const adFormPrice = adForm.querySelector(`.ad-form__price`);
  const adFormRooms = adForm.querySelector(`.ad-form__rooms`);
  const adFormTimeIn = adForm.querySelector(`.ad-form__timein`);
  const adFormTimeOut = adForm.querySelector(`.ad-form__timeout`);
  const adFormGuests = adForm.querySelector(`.ad-form__guests`);
  const adFormSubmit = adForm.querySelector(`.ad-form__submit`);

  const initForm = function () {

    // координаты адреса в неактивном состоянии
    adFormAddress.value = window.map.showAddress(window.map.getAddress());
    // закрываем возможность коррекции поля Адрес руками указав соответсвующий атрибут в разметке
  };

  const toggleForm = function (disabledState) {
    // Если  disabledState = true
    // Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
    for (let i = 0; i < adFieldsets.length; i++) {
      adFieldsets[i].disabled = disabledState;
    }

    if (!disabledState) {
      adForm.classList.remove(`ad-form--disabled`);
    } else {
      adForm.classList.add(`ad-form--disabled`);
    }
  };

  adFormTimeIn.addEventListener(`change`, function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });

  adFormTimeOut.addEventListener(`change`, function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });

  const reinitForm = function () {
    adForm.reset();
  };


  adFormSubmit.addEventListener(`click`, function (evtClick) {
    if ((adFormRooms.value === `100`) === (adFormGuests.value === `0`)) {
      // оба условия или true, или оба false
      // если оба false, надо сравнить кол-во гостей и комнат
      // если оба true, то (adFormRooms.value > adFormGuests.value) => true
      if (adFormRooms.value < adFormGuests.value) {
        adFormGuests.setCustomValidity(`Гостей должно быть не больше количества комнат.`);
      } else {
        adFormGuests.setCustomValidity(``);
        window.server.save(new FormData(adForm), window.utils.onSuccess, window.utils.onError);
        evtClick.preventDefault();
      }
    } else {
      // сюда попадаем если ((adFormRooms.value === `100`) !== (adFormGuests.value === `0`))
      //    т.е. одно условие true, а другое false
      adFormGuests.setCustomValidity(`Некорректный выбор комнат и гостей.`);
    }
  });

  const onChangeType = function (value) {
    adFormPrice.min = value || typesFeatures[adFormType.value].minPrice;
    adFormPrice.placeholder = adFormPrice.min;
  };

  // если раскомментировать, не сбрасывает форму совсем
  adForm.addEventListener(`reset`, function () {
    window.card.onCloseCard();
    window.map.map.classList.add(`map--faded`);
    window.map.clearPins();
    window.map.mapPinMain.style.left = window.main.pinMainLocation.x;
    window.map.mapPinMain.style.top = window.main.pinMainLocation.y;
    setTimeout(onTimeout, 100);
  });

  const onTimeout = function () {
    window.main.initSite();
    onChangeType();
  };

  adFormType.addEventListener(`change`, function () {
    onChangeType();
  });

  window.form = {
    adForm,
    adFormAddress,
    typesFeatures,
    initForm,
    reinitForm,
    toggleForm
  };
})();
