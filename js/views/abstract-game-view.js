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
    // Добавляем блок статуса перед экраном игры
    const resultTemplate = super.render();
    const gameLayout = resultTemplate.querySelector(`.game`);
    const gameScreen = gameLayout.querySelector(`.game__screen`);
    gameLayout.insertBefore(this._statusTemplate, gameScreen);
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
