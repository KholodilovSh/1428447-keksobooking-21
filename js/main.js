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
};

initMap();
