import AbstractView from './abstract-view';
import GameStatus from './game-status-view';

export default class AbstractGameView extends AbstractView {
  /**
   * Базовый класс для основных экранов игры
   * @param {Object} data Данные для представления
   */
  constructor(data) {
    super();
    Object.assign(this, data);
    this.initializeGameStatus();
  }

  /**
   * Генерирует блок статуса игры
   */
  initializeGameStatus() {
    this._statusData = {
      livesLeft: this.livesLeft,
      timeLeft: this.timeLeft,
      bonusTimeLeft: this.bonusTimeLeft};
    this._gameStatus = new GameStatus(this._statusData);
    this._statusTemplate = this._gameStatus.element;
  }

  /**
   * Создает DOM-элемент из разметки
   * @return {HTMLElement}
   */
  render() {
    // Добавляем блок статуса перед основной разметкой
    const resultTemplate = super.render();
    const firstChildInResultTemplate = resultTemplate.firstChild;
    resultTemplate.insertBefore(this._statusTemplate, firstChildInResultTemplate);
    return resultTemplate;
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    // Всплытие события из блока статуса
    this._gameStatus.onResetGame = () => {
      this.onResetGame();
    };
  }

  /** Слушатель на событие сброса игры
   * @abstract
   */
  onResetGame() {
    throw new Error(`You have to implement the method 'onResetGame'!`);
  }

  /** Слушатель на событие ответа
   * @abstract
   */
  onAnswer() {
    throw new Error(`You have to implement the method 'onAnswer'!`);
  }

}
