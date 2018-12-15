import AbstractView from "./abstract-view";

export default class ModalConfirmView extends AbstractView {
  /**
   * Класс для представления модального окна подверждения
   */
  constructor() {
    super(`section`, [`modal`, `modal--hidden`]);
  }

  /**
   * Шаблон
   * @return {string} Строка с разметкой
   */
  get template() {
    return `
<button class="modal__close js-cancel" type="button"><span class="visually-hidden">Закрыть</span></button>
<h2 class="modal__title">Подтверждение</h2>
<p class="modal__text">Вы уверены что хотите начать игру заново?</p>
<div class="modal__buttons">
  <button class="modal__button button js-confirm">Ок</button>
  <button class="modal__button button js-cancel">Отмена</button>
</div>`;
  }

  /**
   * Добавляет обработчики
   */
  bind() {
    // Отмена действия
    const cancelButtons = this.element.querySelectorAll(`.js-cancel`);
    cancelButtons.forEach((button) => button.addEventListener(`click`, this._onCancel.bind(this)));
    // Подтвержение действия
    const confirmButtons = this.element.querySelectorAll(`.js-confirm`);
    confirmButtons.forEach((button) => button.addEventListener(`click`, this._onConfirm.bind(this)));
  }

  /**
   * Включает отображение модального окна
   */
  show() {
    this.element.classList.remove(`modal--hidden`);
  }

  /**
   * Выключает отображение модального окна
   */
  hide() {
    this.element.classList.add(`modal--hidden`);
  }

  /**
   * Слушатель на DOM
   * @param {Event} event Событие
   * @private
   */
  _onConfirm(event) {
    event.preventDefault();
    this.onConfirm();
  }

  /**
   * Слушатель на DOM
   * @param {Event} event Событие
   * @private
   */
  _onCancel(event) {
    event.preventDefault();
    this.onCancel();
  }

  /**
   * Слушатель на подтверждение действия
   */
  onConfirm() {

  }

  /**
   * Слушатель на отмену действия
   */
  onCancel() {

  }
}
