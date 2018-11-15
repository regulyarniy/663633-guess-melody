"use strict";
const templates = [
  document.querySelector(`#welcome`),
  document.querySelector(`#game-genre`),
  document.querySelector(`#game-artist`),
  document.querySelector(`#result-success`),
  document.querySelector(`#fail-time`),
  document.querySelector(`#fail-tries`),
  document.querySelector(`#modal-error`),
  document.querySelector(`#modal-confirm`)
];

const app = document.querySelector(`.main`);

const showScreen = function (screenIndex) {
  while (app.firstChild) {
    app.removeChild(app.firstChild)
  }
  const content = document.importNode(templates[screenIndex].content, true);
  app.appendChild(content);
};
