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
    this.game.startTime = new Date();
  }
};

//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, () => {
  templates.welcome(context);
});
