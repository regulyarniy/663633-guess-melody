import templates from './templates';
import {NEW_GAME, ANSWERS_DATA} from './data/data';
import render from './render';
import animateTimer from './animation/animate-timer';

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
  if (document.querySelector(`.test-timer`)) { // Тест анимации таймера
    const timerElement = document.querySelector(`.timer__line`);
    animateTimer(timerElement, 30);
  } else {
    // Переход на экран приветствия
    render(`Welcome`, context);
  }
});
