import AbstractView from "./abstract-view";

export default class AbstractEndGameView extends AbstractView {
  /**
   * @abstract
   * Базовый класс для представлений экрана результатов
   * Потомок должен содержать в шаблоне кнопку с классом result__replay!
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
