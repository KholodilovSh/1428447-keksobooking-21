"use strict";

const typesFeatures = {
  flat: {
    russian: `Квартира`,
    minPrice: 1000
  },
  bungalow: {
    russian: `Бунгало`,
    minPrice: 0
  },
  house: {
    russian: `Дом`,
    minPrice: 5000
  },
  palace: {
    russian: `Дворец`,
    minPrice: 10000
  }
};

const ad = document.querySelector(`.ad-form`);

const adFieldsets = ad.querySelectorAll(`fieldset`);
const adAddress = ad.querySelector(`.ad-form__address`);
const adFormType = ad.querySelector(`.ad-form__type`);
const adFormPrice = ad.querySelector(`.ad-form__price`);
const adFormRooms = ad.querySelector(`.ad-form__rooms`);
const adFormTimeIn = ad.querySelector(`.ad-form__timein`);
const adFormTimeOut = ad.querySelector(`.ad-form__timeout`);
const adFormGuests = ad.querySelector(`.ad-form__guests`);
const adFormSubmit = ad.querySelector(`.ad-form__submit`);

const initiate = () => {

  // координаты адреса в неактивном состоянии
  adAddress.value = window.mapModule.showAddress(window.mapModule.getAddress());
  // закрываем возможность коррекции поля Адрес руками указав соответсвующий атрибут в разметке
};

const toggle = (disabledState) => {
  // Если  disabledState = true
  // Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
  for (let i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = disabledState;
  }

  if (!disabledState) {
    ad.classList.remove(`ad-form--disabled`);
  } else {
    ad.classList.add(`ad-form--disabled`);
  }
};

adFormTimeIn.addEventListener(`change`, () => {
  adFormTimeOut.value = adFormTimeIn.value;
});

adFormTimeOut.addEventListener(`change`, () => {
  adFormTimeIn.value = adFormTimeOut.value;
});

const reinitiate = () => {
  ad.reset();
};


adFormSubmit.addEventListener(`click`, (evtClick) => {
  if ((adFormRooms.value === `100`) === (adFormGuests.value === `0`)) {
    // оба условия или true, или оба false
    // если оба false, надо сравнить кол-во гостей и комнат
    // если оба true, то (adFormRooms.value > adFormGuests.value) => true
    if (adFormRooms.value < adFormGuests.value) {
      adFormGuests.setCustomValidity(`Гостей должно быть не больше количества комнат.`);
    } else {
      adFormGuests.setCustomValidity(``);
      window.server.save(new FormData(ad), window.utils.onSuccess, window.utils.onError);
      evtClick.preventDefault();
    }
  } else {
    // сюда попадаем если ((adFormRooms.value === `100`) !== (adFormGuests.value === `0`))
    //    т.е. одно условие true, а другое false
    adFormGuests.setCustomValidity(`Некорректный выбор комнат и гостей.`);
  }
});

const onChangeType = (value) => {
  adFormPrice.min = value || typesFeatures[adFormType.value].minPrice;
  adFormPrice.placeholder = adFormPrice.min;
};

// если раскомментировать, не сбрасывает форму совсем
ad.addEventListener(`reset`, () => {
  window.card.onClose();
  window.mapModule.map.classList.add(`map--faded`);
  window.mapModule.clearPins();
  window.mapModule.pinMain.style.left = window.main.pinLocation.x;
  window.mapModule.pinMain.style.top = window.main.pinLocation.y;
  window.photos.clear();
  setTimeout(onTimeout, 100);
});

const onTimeout = () => {
  window.main.initSite();
  onChangeType();
};

adFormType.addEventListener(`change`, () => {
  onChangeType();
});

window.form = {
  ad,
  adAddress,
  typesFeatures,
  initiate,
  reinitiate,
  toggle
};
