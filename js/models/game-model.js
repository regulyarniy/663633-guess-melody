import {NEW_GAME, ANSWERS_DATA, Settings, Timer} from '../constants/constants';

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
   * @private
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
    this._recountLives();
    this._changeLevel();
  }

  /**
   * Проверяет и сохраняет ответ игрока
   * @param {Array|Number} answer Ответ игрока
   * @private
   */
  _saveAnswer(answer) {
    // Игра на жанр
    if (this.isCurrentQuestionAboutGenre) {
      const equalAnswers = this.currentQuestion.answers.map((value, index) => {
        return value.valid === answer[index];
      });
      const isAnswerFalse = equalAnswers.some((item) => {
        return item === Settings.FAILED_ANSWER;
      });
      this._state.answers.push(!isAnswerFalse);
    } else { // Игра на артиста
      let validId;
      for (const question of this.currentQuestion.answers) {
        if (question.valid === Settings.SUCCESS_ANSWER) {
          validId = question.id;
          break;
        }
      }
      const isAnswerFalse = validId !== answer;
      this._state.answers.push(!isAnswerFalse);
    }
  }

  /**
   * Пересчитывает жизни игрока согласно последнему ответу
   * @private
   */
  _recountLives() {
    const lastIndexOfAnswers = this.state.answers.length - 1;
    const lastAnswer = this.state.answers[lastIndexOfAnswers];
    const livesResultForFail = this.state.livesLeft - Settings.LIVES_DECREMENT;
    this._state.livesLeft = lastAnswer ? this.state.livesLeft : livesResultForFail;
  }

  /**
   * Вычисляет время до окончания таймера
   * @param {Date} startDate Начало отсчёта(инстанс Data)
   * @param {Number} timer Таймер(секунды)
   * @param {Date} checkDate Момент проверки(инстанс Data)
   * @return {number} Возвращает количество секунд до истечения таймера или -1, если таймер истек
   */
  static getTimeLeft(startDate, timer, checkDate = new Date()) {
    const checkDateInSeconds = checkDate.getTime() / Timer.DATE_MS_TO_SEC_MULTIPLY;
    const startDateInSeconds = startDate.getTime() / Timer.DATE_MS_TO_SEC_MULTIPLY;
    const timeLeft = checkDateInSeconds - startDateInSeconds + timer;
    return (timeLeft >= Timer.TIMER_END) ? timeLeft : Timer.TIMER_END_RESULT;
  }
}
