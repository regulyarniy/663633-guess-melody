import AbstractEndGameView from './abstract-end-game-view';
import utils from '../utils';

const {convertSecondsToHumanReadableString} = utils;

export default class SuccessView extends AbstractEndGameView {
  /**
   * Класс экрана выигрыша и вывода результатов
   * @param {Object} data Обьект вида {
    time: 75,
    score: 12,
    bonusScore: 4,
    mistakes: 2,
    rating: `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`
  }
   */
  constructor(data) {
    super();
    Object.assign(this, data); // Сливаем свойства data с инстансом
  }

  /**
   * Преобразует число секунд в строку с разбором на минуты и секунды
   * @return {String} Возвращает строку со временем прохождения игры
   */
  get timeText() {
    return convertSecondsToHumanReadableString(this.time);
  }

  /**
   * Преобразует число в строку с учетом склонения
   * @return {String} Возвращает строку с количеством ошибок за игру
   */
  get mistakesText() {
    return this.mistakes; // TODO реализовать склонение
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Вы настоящий меломан!</h2>
  <p class="result__total">За ${this.timeText} вы набрали ${this.score} баллов (${this.bonusScore} быстрых), совершив ${this.mistakesText} ошибки</p>
  <p class="result__text">${this.rating}</p>
  <button class="result__replay" type="button">Сыграть ещё раз</button>
</section>`;
  }
}
