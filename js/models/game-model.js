import {NEW_GAME, ANSWERS_DATA} from '../constants/constants';

export default class GameModel {
  /**
   * Модель игры
   */
  constructor() {
    this.startNewGame();
  }

  /**
   * Возвращает состояние игры
   * @return {Readonly<Object>}
   */
  get state() {
    return Object.freeze(Object.assign({}, this._state));
  }

  /**
   * Возвращает массив с данными вопросов
   * @return {Readonly<Array>}
   */
  get questions() {
    return ANSWERS_DATA;
  }

  /**
   * Начинает новую игру
   */
  startNewGame() {
    this._state = JSON.parse(JSON.stringify(NEW_GAME));
    this._state.startTime = new Date();
  }


}
