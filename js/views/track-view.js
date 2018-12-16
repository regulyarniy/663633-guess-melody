import AbstractView from "./abstract-view";
import {Settings} from "../constants/constants";

export default class TrackView extends AbstractView {
  /**
   * Класс представления трека для основного игрового экрана игры на жанр
   * @param {Object} data Данные для представления
   * @param {Number} id Идентификатор трека в списке
   * @param {boolean} isValid Это правильный ответ?
   */
  constructor(data, id, isValid) {
    const trackClasses = [`track`];

    // DEBUG
    if (Settings.DEBUG && isValid) {
      trackClasses.push(`track--valid`);
    }

    super(`div`, trackClasses);
    Object.assign(this, data);
    this._id = id;
  }

  get template() {
    return `<button class="track__button track__button--play" data-src="${this.src}" type="button"></button>
  <div class="track__status"></div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${this._id}" id="answer-${this._id}">
    <label class="game__check" for="answer-${this._id}">Отметить</label>
  </div>`;
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    // Выбор ответа
    const buttonAnswer = this.element.querySelector(`.game__check`);

    buttonAnswer.addEventListener(`click`, () => {
      this.onChangeAnswer();
    });
  }

  /**
   * Слушатель на выбор ответа
   */
  onChangeAnswer() {

  }

}
