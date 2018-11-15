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

const state = {
  currentScreen: 0
};

const showScreen = function (screenIndex) {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  if (screenIndex < 0) {
    screenIndex = templates.length - 1;
  }
  if (screenIndex >= templates.length) {
    screenIndex = 0;
  }
  const content = document.importNode(templates[screenIndex].content, true);
  app.appendChild(content);
  state.currentScreen = screenIndex;
};

document.addEventListener(`DOMContentLoaded`, function () {
  showScreen(0);
});

document.addEventListener(`keydown`, function (e) {
  switch (e.key) {
    case `ArrowLeft`:
      showScreen(state.currentScreen - 1);
      break;
    case `ArrowRight`:
      showScreen(state.currentScreen + 1);
      break;
  }
});
