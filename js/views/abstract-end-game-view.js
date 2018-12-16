import AbstractView from "./abstract-view";

export default class AbstractEndGameView extends AbstractView {
  /**
   * Базовый класс для представлений экрана результатов
   * Потомок должен содержать в шаблоне кнопку с классом result__replay!
   */
  constructor() {
    super();
  }

  /**
   * Добавление обработчика
   * Потомок должен содержать в шаблоне кнопку с классом!
   */
  bind() {
    const buttonReset = this.element.querySelector(`.result__replay`);

    buttonReset.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onResetGame();
    });
  }

  /**
   * Слушатель на кнопку сброса игры
   */
  onResetGame() {
    throw new Error(`You have to implement the method 'onResetGame'!`);
  }
}
