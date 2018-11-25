import templates from './templates';
import {NEW_GAME, ANSWERS_DATA} from './data/data';
import render from './render';

const application = document.querySelector(`.app`); // Контейнер приложения

const context = {
  application,
  templates,
  render,
  game: {},
  ANSWERS_DATA,
  NEW_GAME,
  startNewGame() {
    this.game = JSON.parse(JSON.stringify(this.NEW_GAME));
  }
};

//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, () => {
  // Переход на экран приветствия
  render(`Welcome`, context);
});


