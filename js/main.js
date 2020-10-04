"use strict";

const OBJECTS = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const RANGE_X = [0, 1000];
const RANGE_Y = [130, 630];
const RANGE_PHOTOS = [1, 10];

const PIN_HEIGHT = 165;
const PIN_WIDTH_HALF = 25;

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const getRandomNumber = (minNumber = 0, maxNumber = 100, roundDigit = 0) => minNumber + Math.round((maxNumber - minNumber) * Math.random(), roundDigit);
const getRandomFromRange = (array) => getRandomNumber(array[0], array[1]);

const initMap = function () {
  map.classList.remove(`map--faded`);
};

const getJSObjects = function () {
  const jsObjects = [];
  for (let i = 1; i <= OBJECTS; i++) {

    const locationX = getRandomFromRange(RANGE_X);
    const locationY = getRandomFromRange(RANGE_Y);

    const objectPhotos = [];
    const numberPhotos = getRandomFromRange(RANGE_PHOTOS);
    for (let j = 1; j <= numberPhotos; j++) {
      objectPhotos.push(`http://o${i - 1}.github.io/assets/images/tokyo/hotel${j}.jpg`);
    }

    jsObjects.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `заголовок_${i}`,
        address: `${locationX},${locationY}`,
        price: 100 * i,
        type: TYPES[0],
        rooms: 1,
        guests: 3,
        checkin: CHECKIN[0],
        checkout: CHECKOUT[0],
        features: FEATURES[0],
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

const showPins = function (jsObjects) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < jsObjects.length; i++) {
    fragment.appendChild(renderPin(jsObjects[i]));
  }
  mapPins.appendChild(fragment);
};

const jsObjects = getJSObjects();

initMap(jsObjects);

showPins(jsObjects);
