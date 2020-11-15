"use strict";

const RANGE_X = [0, 1200];
const RANGE_Y = [130, 630];

const getPointsOfPins = () => {
  const jsObjects = window.server.load();
  return jsObjects;
};

window.data = {
  RANGE_X,
  RANGE_Y,
  getPointsOfPins
};
