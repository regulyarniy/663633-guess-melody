import AbstractView from "./abstract-view";

export default class ModalErrorView extends AbstractView {
  /**
   * Класс для представления модального окна ошибки
   * @param {String} error Текст ошибки
   */
  constructor(error) {
    super();
    this._error = error;
  }

  get template() {
    return `<section class="modal">
      <h2 class="modal__title">Произошла ошибка!</h2> 
      <p class="modal__text">${this._error}. Пожалуйста, перезагрузите страницу.</p>
    </section>`;
  }

  bind() {

  }
}
