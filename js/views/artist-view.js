import AbstractView from "./abstract-view";
import {Settings} from "../constants/constants";

export default class ArtistView extends AbstractView {
  /**
   * Класс представления артиста для основного игрового экрана
   * @param {Object} data Данные для представления
   * @param {Number} id Идентификатор артиста в списке
   */
  constructor(data, id) {
    const artistClasses = [`artist`];

    // DEBUG
    if (Settings.DEBUG && data.isCorrect) {
      artistClasses.push(`artist--valid`);
    }

    super(`div`, artistClasses);
    Object.assign(this, data);
    this._id = id;
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<input class="artist__input visually-hidden" type="radio" name="answer" value="${this._id}" id="answer-${this._id}">
  <label class="artist__name" for="answer-${this._id}">
    <img class="artist__picture" src="${this.image.url}" alt="${this.title}">
    ${this.title}
  </label>`;
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    // Ответ игрока
    const buttonAnswer = this.element.querySelector(`.artist__input`);
    buttonAnswer.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAnswer(this.isCorrect);
    });
  }

  /** Слушатель на выбор ответа
   */
  onAnswer() {

  }
}
