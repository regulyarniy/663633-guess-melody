import AbstractView from "./abstract-view";
import animateBonusTimer from '../services/animate-timer';
import {NEW_GAME, MAX_MISTAKES} from "../constants/constants";

export default class GameStatusView extends AbstractView {
  /**
   * Класс для представления блока со статусом игры
   * @param {Object} data Обьект c данными для представления
   */
  constructor(data) {
    super(`header`, [`game__header`]);
    Object.assign(this, data); // Сливаем свойства data с инстансом
    this._minutesElement = null;
    this._secondsElement = null;
    this._isTimerExpires = false;
  }

  /**
   * Генерирует строку с индикатором попыток
   * @return {string}
   */
  get livesLeftTemplate() {
    const mistakesIndex = this.livesLeft; // Индекс с которого начинать рисовать красные ноты

    return Array(MAX_MISTAKES)
      .fill(`<div class="correct"></div>`, 0, mistakesIndex)
      .fill(`<div class="wrong"></div>`, mistakesIndex, MAX_MISTAKES + 1)
      .join(``);
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `  <a class="game__back" href="#">
    <span class="visually-hidden">Сыграть ещё раз</span>
    <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
  </a>

  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>

  <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer__mins">05</span>
    <span class="timer__dots">:</span>
    <span class="timer__secs">00</span>
  </div>

  <div class="game__mistakes">
    ${this.livesLeftTemplate}
  </div>`;
  }

  /**
   * Функция обновления таймера
   * @param {number} timeLeft Количество секунд
   */
  updateTimer(timeLeft) {
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;
    this._minutesElement.textContent = minutesLeft < 10 ? `0` + minutesLeft : minutesLeft;
    this._secondsElement.textContent = secondsLeft < 10 ? `0` + secondsLeft : secondsLeft;
  }

  /**
   * Индикация что время подходит к концу
   */
  blinkTimer() {
    if (!this._isTimerExpires) {
      this._timerValue.classList.add(`timer__value--finished`);
      this._isTimerExpires = true;
    }
  }

  /**
   * Функция старта анимации круглого таймера
   * @param {number} timeLeft Количество секунд
   */
  startRoundTimerAnimation(timeLeft) {
    animateBonusTimer(this._roundTimerElement, timeLeft, NEW_GAME.timeLeft);
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    const buttonReset = this.element.querySelector(`.game__back`);

    buttonReset.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onResetGame();
    });

    // Кешируем элементы таймеров
    this._roundTimerElement = this.element.querySelector(`.timer__line`);
    this._timerValue = this.element.querySelector(`.timer__value`);
    this._minutesElement = this._timerValue.querySelector(`.timer__mins`);
    this._secondsElement = this._timerValue.querySelector(`.timer__secs`);

    // Обновляем начальное состояние таймера
    this.updateTimer(this.timeLeft);
  }

  /**
   * Слушатель на кнопку сброса игры
   */
  onResetGame() {

  }

}
