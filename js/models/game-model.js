import {NEW_GAME, ANSWERS_DATA} from '../constants/constants';
import {Settings} from '../constants/constants';

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
   * Возвращает текущий вопрос
   * @return {Object} Обьект с данными вопроса
   */
  get currentQuestion() {
    return this.questions[this._state.currentLevel];
  }

  /**
   * Возвращает, является ли текущий вопрос о жанре, или об артисте
   * @return {boolean} true если вопрос о жанре
   */
  get isCurrentQuestionAboutGenre() {
    return this.currentQuestion.hasOwnProperty(`genre`);
  }

  /**
   * Начинает новую игру
   */
  startNewGame() {
    this._state = JSON.parse(JSON.stringify(NEW_GAME));
    this._state.startTime = new Date();
  }

  /**
   * Переключает игру на следующий уровень
   */
  _changeLevel() {
    if (this._state.livesLeft === 0 || this._state.currentLevel >= Settings.LEVEL_MAX) {
      this._state.currentLevel = Settings.LEVEL_ENDGAME;
    } else {
      this._state.currentLevel = this._state.currentLevel + Settings.LEVEL_INCREMENT;
    }
  }

  /**
   * Обрабатывает ответ игрока
   * @param {Array|Number} answer Ответ игрока
   */
  setAnswer(answer) {
    this._saveAnswer(answer);
    this._changeLevel();
  }

  _saveAnswer(answer) {
    // Игра на жанр
    if (this.isCurrentQuestionAboutGenre) {
      const equalAnswers = this.currentQuestion.answers.map((value, index) => {
        return value.valid === answer[index];
      });
      const isAnswerFalse = equalAnswers.some((item) => {
        return item === false;
      });
      this._state.answers.push(!isAnswerFalse);
    } else { // Игра на артиста

    }
  }
}
