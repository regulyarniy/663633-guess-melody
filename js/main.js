"use strict";
//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, function () {
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

  const main = document.querySelector(`.main`);
  const app = document.querySelector(`.app`);
  const templateControls = document.querySelector(`#control-buttons`);
  const state = {
    currentScreen: 0
  };

  //  Переключение экранов
  const showScreen = function (screenIndex) {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    if (screenIndex < 0) {
      screenIndex = templates.length - 1;
    }
    if (screenIndex >= templates.length) {
      screenIndex = 0;
    }
    const content = document.importNode(templates[screenIndex].content, true);
    main.appendChild(content);
    state.currentScreen = screenIndex;
  };

  // Управление с клавиатуры
  const bindKeys = function () {
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
  };

  //  Рендер элементов управления
  const addControls = function () {
    const content = document.importNode(templateControls.content, true);
    app.appendChild(content);
  };

  // Управление с элементов
  const bindControls = function () {
    const prev = app.querySelector(`.arrows__btn--prev`);
    const next = app.querySelector(`.arrows__btn--next`);

    prev.addEventListener(`click`, function (e) {
      e.preventDefault();
      showScreen(state.currentScreen - 1);
    });

    next.addEventListener(`click`, function (e) {
      e.preventDefault();
      showScreen(state.currentScreen + 1);
    });
  };

  showScreen(0);
  bindKeys();
  addControls();
  bindControls();
});


