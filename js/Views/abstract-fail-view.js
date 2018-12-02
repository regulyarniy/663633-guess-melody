import AbstractView from "./abstract-view";

export default class AbstractFailView extends AbstractView {
  /**
   * Базовый класс для представлений экрана проигрыша
   * Потомок должен содержать в шаблоне кнопку с классом!
   */
  constructor() {
    super();
  }

  /**
   * Слушатель на кнопку сброса игры
   */
  onResetGame() {

  }

  /**
   * Добавление обработчика
   * Потомок должен содержать в шаблоне кнопку с классом!
   */
  bind() {
    const buttonReset = this.element.querySelector(`.result__replay`);

    buttonReset.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.onResetGame();
    });
  }
}
