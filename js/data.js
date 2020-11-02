"use strict";

(function () {

  const POINTS_AMOUNT = 8;
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];

  const CHECKIN = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const RANGE_X = [0, 1200];
  const RANGE_Y = [130, 630];
  const RANGE_PHOTOS = [1, 3];
  const RANGE_PRICE = [0, 1000000];
  const RANGE_ROOMS = [1, 10];
  const RANGE_GUESTS = [1, 10];

  const getPointsOfPins = function () {
    const jsObjects = [];
    for (let i = 1; i <= POINTS_AMOUNT; i++) {

      const locationX = window.utils.getRandomFromRange(RANGE_X);
      const locationY = window.utils.getRandomFromRange(RANGE_Y);

      const objectPhotos = [];
      const numberPhotos = window.utils.getRandomFromRange(RANGE_PHOTOS);
      for (let j = 1; j <= numberPhotos; j++) {
        objectPhotos.push(`http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`);
      }

      const arrayFeatures = FEATURES.slice(0, window.utils.getRandomNumber(1, FEATURES.length) - 1);

      jsObjects.push({
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: `заголовок_${i}`,
          address: `${locationX},${locationY}`,
          price: window.utils.getRandomFromRange(RANGE_PRICE),
          type: window.utils.getRandomFromArray(TYPES),
          rooms: window.utils.getRandomFromRange(RANGE_ROOMS),
          guests: window.utils.getRandomFromRange(RANGE_GUESTS),
          checkin: window.utils.getRandomFromArray(CHECKIN),
          checkout: window.utils.getRandomFromArray(CHECKOUT),
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

  window.data = {
    RANGE_X,
    RANGE_Y,
    getPointsOfPins
  };

})();
