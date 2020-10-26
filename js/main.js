"use strict";

const POINTS_AMOUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
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
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const RANGE_X = [0, 1200];
const RANGE_Y = [130, 630];
const RANGE_PHOTOS = [1, 3];
const RANGE_PRICE = [0, 1000000];
const RANGE_ROOMS = [1, 10];
const RANGE_GUESTS = [1, 10];

// координаты адреса в неактивном состоянии
const BUTTON_STYLE_LEFT = 570;
const BUTTON_STYLE_TOP = 375;
const MAFFIN_MIDDLE = 33;
const ADDRESS_INIT = `${BUTTON_STYLE_LEFT + MAFFIN_MIDDLE},${BUTTON_STYLE_TOP + MAFFIN_MIDDLE}`;

const PIN_HEIGHT = 165;
const PIN_WIDTH_HALF = 25;

const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
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

const mapFilters = document.querySelector(`.map__filters`);

let jsPins;

const getRandomNumber = function (minNumber = 0, maxNumber = 100, roundDigit = 0) {
  return minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);
};

const getRandomFromRange = function (arrayRange) {
  return getRandomNumber(...arrayRange);
};

const getRandomFromArray = function (arrayItems) {
  return arrayItems[getRandomNumber(0, arrayItems.length - 1)];
};

const getPointsOfPins = function () {
  const jsObjects = [];
  for (let i = 1; i <= POINTS_AMOUNT; i++) {

    const locationX = getRandomFromRange(RANGE_X);
    const locationY = getRandomFromRange(RANGE_Y);

    const objectPhotos = [];
    const numberPhotos = getRandomFromRange(RANGE_PHOTOS);
    for (let j = 1; j <= numberPhotos; j++) {
      objectPhotos.push(`http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`);
    }

    const arrayFeatures = FEATURES.slice(0, getRandomNumber(1, FEATURES.length) - 1);

    jsObjects.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `заголовок_${i}`,
        address: `${locationX},${locationY}`,
        price: getRandomFromRange(RANGE_PRICE),
        type: getRandomFromArray(TYPES),
        rooms: getRandomFromRange(RANGE_ROOMS),
        guests: getRandomFromRange(RANGE_GUESTS),
        checkin: getRandomFromArray(CHECKIN),
        checkout: getRandomFromArray(CHECKOUT),
        features: arrayFeatures,
        description: `описание_${i}`,
        photos: objectPhotos,
        location: {
          x: locationX,
          y: locationY
        }
      }
    });
  }
  return jsObjects;
};

const showPins = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < jsPins.length; i++) {
    fragment.appendChild(renderPin(jsPins[i], i));
  }
  mapPins.appendChild(fragment);
};

const renderPin = function (pin, dataSet) {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${pin.offer.location.x - PIN_WIDTH_HALF}px`;
  pinElement.style.top = `${pin.offer.location.y - PIN_HEIGHT}px`;
  pinElement.addEventListener(`click`, function () {
    if (!map.querySelector(`.map__card`)) {
      map.insertBefore(renderCard(pin), mapFiltersContainer);
    }
  });

  const imgElement = pinElement.querySelector(`img`);
  imgElement.src = pin.author.avatar;
  imgElement.alt = pin.offer.description;
  // imgElement.dataset.jsNumber = dataSet;

  return pinElement;
};

const toggleState = function (disabledState) {
  // Если  disabledState = true
  // Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
  for (let i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = disabledState;
  }

  // а форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
  mapFilters.disabled = disabledState;
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = disabledState;
  }

  if (disabledState === false) {
    adForm.classList.remove(`ad-form--disabled`);
  }
};

const onClickShowPins = function () {
  map.classList.remove(`map--faded`);

  jsPins = getPointsOfPins();

  showPins();

  // map.addEventListener(`click`, onClickPinShowCard);

  mapPinMain.removeEventListener(`mousedown`, onClickShowPins);
};

// const onClickPinShowCard = function (evt) {
//   if (evt.target.dataset.jsNumber) {
//     map.insertBefore(renderCard(jsPins[evt.target.dataset.jsNumber]), mapFiltersContainer);
//     map.removeEventListener(`click`, onClickPinShowCard);
//   }
// };

const initMap = function () {

  adFormAddress.value = ADDRESS_INIT;
  // закрываем возможность коррекции поля Адрес руками
  adFormAddress.readonly = true;

  toggleState(true);

  // Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main, являющейся контролом указания адреса объявления. Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние. Событие mousedown должно срабатывать только при нажатии основной кнопки мыши (обычно — левая).
  mapPinMain.addEventListener(`mousedown`, onClickShowPins);

  mapPinMain.addEventListener(`mousedown`, function () {
    toggleState(false);
  });
};

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
  someElement.textContent = typesFeatures[pin.offer.type].russian;

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
  // <div class="popup__photos">
  //   <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
  // </div>

  // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
  someElement = cardElement.querySelector(`.popup__avatar`);
  someElement.src = pin.author.avatar;

  const closeElement = cardElement.querySelector(`.popup__close`);

  closeElement.addEventListener(`click`, onCloseCard);

  document.addEventListener(`keydown`, onEscapeCloseCard);

  return cardElement;
};

const onEscapeCloseCard = function (evt) {
  if (evt.key === `Escape`) {
    onCloseCard();
  }
};

const onCloseCard = function () {
  const cardToRemove = map.querySelector(`.map__card`);
  if (cardToRemove) {
    cardToRemove.remove();
    document.removeEventListener(`keydown`, onEscapeCloseCard);
  }

  map.addEventListener(`click`, onClickPinShowCard);
};

const onChangeType = function (value) {
  adFormPrice.min = value || typesFeatures[adFormType.value].minPrice;
  adFormPrice.placeholder = adFormPrice.min;
};

// const adFormReset = document.querySelector(`.ad-form__reset`);

// adFormReset.addEventListener(`click`, function (evt) {
//   evt.preventDefault();
//   adForm.reset();
//   initMap();
//   onChangeType();
//   // evt.preventDefault();
// });


adForm.addEventListener(`reset`, function (evt) {
  evt.preventDefault();
  adForm.reset();
  initMap();
  onChangeType();
  // evt.preventDefault();
});

adFormSubmit.addEventListener(`click`, function () {
  if ((adFormRooms.value === `100`) === (adFormGuests.value === `0`)) {
    // оба условия или true, или оба false
    // если оба false, надо сравнить кол-во гостей и комнат
    // если оба true, то (adFormRooms.value > adFormGuests.value) => true
    if (adFormRooms.value < adFormGuests.value) {
      adFormGuests.setCustomValidity(`Гостей должно быть не больше количества комнат.`);
    } else {
      adFormGuests.setCustomValidity(``);
    }
  } else {
    // сюда попадаем если ((adFormRooms.value === `100`) !== (adFormGuests.value === `0`))
    //    т.е. одно условие true, а другое false
    adFormGuests.setCustomValidity(`Некорректный выбор комнат и гостей.`);
  }
});

adFormType.addEventListener(`change`, function () {
  onChangeType();
});

adFormTimeIn.addEventListener(`change`, function () {
  adFormTimeOut.value = adFormTimeIn.value;
});

adFormTimeOut.addEventListener(`change`, function () {
  adFormTimeIn.value = adFormTimeOut.value;
});

window.addEventListener(`load`, initMap);
