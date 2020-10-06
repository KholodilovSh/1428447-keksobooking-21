"use strict";

const POINTS_AMOUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const RANGE_X = [0, 1200];
const RANGE_Y = [130, 630];
const RANGE_PHOTOS = [1, 10];
const RANGE_PRICE = [0, 1000000];
const RANGE_ROOMS = [1, 10];
const RANGE_GUESTS = [1, 10];

const PIN_HEIGHT = 165;
const PIN_WIDTH_HALF = 25;

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);


const getRandomNumber = (minNumber = 0, maxNumber = 100, roundDigit = 0) => minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);
const getRandomFromRange = (arrayRange) => getRandomNumber(...arrayRange);
const getRandomFromArray = (arrayItems) => arrayItems[getRandomNumber(0, arrayItems.length - 1)];

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
        features: getRandomFromArray(FEATURES),
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

const renderPin = function (pin) {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${pin.offer.location.x - PIN_WIDTH_HALF}px`;
  pinElement.style.top = `${pin.offer.location.y - PIN_HEIGHT}px`;

  const imgElement = pinElement.querySelector(`img`);
  imgElement.src = pin.author.avatar;
  imgElement.alt = pin.offer.description;

  return pinElement;
};

const showPins = function (jsPins) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < jsPins.length; i++) {
    fragment.appendChild(renderPin(jsPins[i]));
  }
  mapPins.appendChild(fragment);
};

const initMap = function () {
  map.classList.remove(`map--faded`);

  const jsPins = getPointsOfPins();

  showPins(jsPins);

  map.insertBefore(renderCard(jsPins[0]), mapFiltersContainer);
};

const renderCard = function (pin) {
  const cardElement = cardTemplate.cloneNode(true);

  // Выведите заголовок объявления offer.title в заголовок .popup__title.
  let someElement = cardElement.querySelector(`.popup__title`);
  someElement.innerText = pin.offer.title;

  // Выведите адрес offer.address в блок .popup__text--address.
  someElement = cardElement.querySelector(`.popup__text--address`);
  someElement.innerText = pin.offer.address;

  // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь.
  // Например, 5200₽/ночь.
  // <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
  someElement = cardElement.querySelector(`.popup__text--price`);
  someElement.innerText = `${pin.offer.price}₽/ночь`;

  // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
  someElement = cardElement.querySelector(`.popup__type`);
  someElement.innerText = pin.offer.type;

  // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
  someElement = cardElement.querySelector(`.popup__text--capacity`);
  someElement.innerText = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;

  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
  someElement = cardElement.querySelector(`.popup__text--time`);
  someElement.innerText = `заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;

  // В список .popup__features выведите все доступные удобства в объявлении.
  someElement = cardElement.querySelector(`.popup__features`);
  const someChildren = someElement.children;
  const classFeature = `popup__feature--${pin.offer.features}`;

  for (let i = someChildren.length - 1; i >= 0; i--) {
    const child = someChildren[i];
    if (!child.classList.contains(classFeature)) {
      someChildren[i].remove();
    }
  }

  // В блок .popup__description выведите описание объекта недвижимости offer.description.
  someElement = cardElement.querySelector(`.popup__description`);
  someElement.innerText = pin.offer.description;

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

  return cardElement;
};

initMap();

