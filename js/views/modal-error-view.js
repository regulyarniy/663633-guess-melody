import AbstractView from "./abstract-view";

export default class ModalErrorView extends AbstractView {
  /**
   * Класс для представления модального окна ошибки
   * @param {String} error Статус ошибки
   */
  constructor(error) {
    super();
    this._errorStatus = error;
  }

  get template() {
    return `<section class="modal">
      <h2 class="modal__title">Произошла ошибка!</h2> 
      <p class="modal__text">Статус: ${this._errorStatus}. Пожалуйста, перезагрузите страницу.</p>
    </section>`;
  }

  bind() {
  }
}
