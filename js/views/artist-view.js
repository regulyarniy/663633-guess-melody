import AbstractView from "./abstract-view";

export default class ArtistView extends AbstractView {
  /**
   * Класс представления артиста для основного игрового экрана
   * @param {Object} data Данные для представления
   */
  constructor(data) {
    super(`div`, [`artist`]);
    Object.assign(this, data);
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<input class="artist__input visually-hidden" type="radio" name="answer" value="${this.id}" id="answer-${this.id}">
  <label class="artist__name" for="answer-${this.id}">
    <img class="artist__picture" src="${this.pictureURL}" alt="${this.artist}">
    ${this.artist}
  </label>`;
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    const buttonAnswer = this.element.querySelector(`.artist__input`);

    buttonAnswer.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.onAnswer();
    });
  }

  /** Слушатель на выбор ответа
   */
  onAnswer() {

  }
}
