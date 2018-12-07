import {NEW_GAME, ANSWERS_DATA, Settings, Timer, ScoreSettings, RatingSettings} from '../constants/constants';

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
   * Данные для вопроса //TODO test
   * @return {*}
   */
  get questionData() {
    if (this.isCurrentQuestionAboutGenre) {
      return {
        genre: this.currentQuestion.genre,
        tracks: this.currentQuestion.answers,
        livesLeft: this.state.livesLeft,
      };
    } else {
      return {
        audioURL: this.currentQuestion.audioURL,
        artists: this.currentQuestion.answers,
        livesLeft: this.state.livesLeft,
      };
    }
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
   * Считает набранные баллы
   * @return {Number} Возвращает количество баллов или -1, если закончились попытки или получены не все ответы
   */
  get score() {
    if (this.questions.length < ScoreSettings.MAX_QUESTIONS || this.state.livesLeft <= ScoreSettings.MIN_LIVES) {
      return ScoreSettings.FAIL_RESULT;
    }
    const reducer = (accumulator, currentValue) => {
      const {success, time} = currentValue;
      const bonus = (time <= ScoreSettings.BONUS_TIME) ? ScoreSettings.BONUS_SUCCESS : ScoreSettings.BONUS_FAIL;
      const increment = (success) ? ScoreSettings.SCORE_SUCCESS * bonus : ScoreSettings.SCORE_FAIL;
      return accumulator + increment;
    };
    return this.state.answers.reduce(reducer, ScoreSettings.REDUCER_INITIAL_VALUE);
  }

  /**
   * Считает набранные бонусные баллы
   * @return {Number} Возвращает количество баллов или -1, если закончились попытки или получены не все ответы
   */
  get bonusScore() {
    if (this.questions.length < ScoreSettings.MAX_QUESTIONS || this.state.livesLeft <= ScoreSettings.MIN_LIVES) {
      return ScoreSettings.FAIL_RESULT;
    }
    const reducer = (accumulator, currentValue) => {
      const {success, time} = currentValue;
      const increment = (success && time <= ScoreSettings.BONUS_TIME) ? ScoreSettings.SCORE_SUCCESS * ScoreSettings.BONUS_SUCCESS : ScoreSettings.SCORE_FAIL_FOR_BONUS_SCORE;
      return accumulator + increment;
    };
    return this.state.answers.reduce(reducer, ScoreSettings.REDUCER_INITIAL_VALUE);
  }

  /**
   * Статистика игроков
   * @return {number[]}
   * @private
   */
  get _statistics() {
    return [4, 6, 8, 1, 12, 10, 6, 8, 2]; // TODO it's fake
  }

  /**
   * Вычисляет сообщение о результате игрока // TODO move to view?
   * @return {string} Возвращает строку с результатом игры
   */
  get rating() {
    if (this.state.livesLeft <= RatingSettings.MIN_LIVES) {
      return RatingSettings.RESULT_FAIL_TRIES;
    }
    if (this.state.timeLeft <= RatingSettings.MIN_TIME_LEFT) {
      return RatingSettings.RESULT_FAIL_TIME;
    }
    let newStatistics = this._statistics.slice();
    newStatistics.push(this.score);
    newStatistics.sort((a, b) => b - a);
    const position = newStatistics.indexOf(this.score) + RatingSettings.POSITION_INCREMENT;
    const playersCount = newStatistics.length;
    const playerRating = Math.floor(((playersCount - position) / playersCount) * 100);
    return `Вы заняли ${position} место из ${playersCount} игроков. Это лучше, чем у ${playerRating}% игроков`;
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
   * Проверяет и сохраняет ответ игрока
   * @param {Array|Number} answer Ответ игрока
   * @private
   */
  _saveAnswer(answer) {
    // Игра на жанр
    let isAnswerFalse;
    if (this.isCurrentQuestionAboutGenre) {
      const equalAnswers = this.currentQuestion.answers.map((value, index) => {
        return value.valid === answer[index];
      });
      isAnswerFalse = equalAnswers.some((item) => {
        return item === Settings.FAILED_ANSWER;
      });
    } else { // Игра на артиста
      let validId;
      for (const question of this.currentQuestion.answers) {
        if (question.valid === Settings.SUCCESS_ANSWER) {
          validId = question.id;
          break;
        }
      }
      isAnswerFalse = validId !== answer;
    }
    this._state.answers.push({success: !isAnswerFalse, time: this.state.bonusTimeLeft});
  }

  /**
   * Пересчитывает жизни игрока согласно последнему ответу
   * @private
   */
  _recountLives() {
    const lastIndexOfAnswers = this.state.answers.length - 1;
    const lastAnswer = this.state.answers[lastIndexOfAnswers].success;
    const livesResultForFail = this.state.livesLeft - Settings.LIVES_DECREMENT;
    this._state.livesLeft = lastAnswer ? this.state.livesLeft : livesResultForFail;
  }

  /**
   * Функция обновления таймеров
   * @private
   */
  _tick() {
    if (this.state.timeLeft > 0) {
      this._state.timeLeft--;
      this.onUpdateTimer();
      this.startTimers();
    } else {
      this.onTimeLeft();
    }

    if (this.state.bonusTimeLeft > 0) {
      this._state.bonusTimeLeft--;
    }
  }

  /**
   * Начинает новую игру
   */
  startNewGame() {
    this._state = JSON.parse(JSON.stringify(NEW_GAME));
  }

  /**
   * Обрабатывает ответ игрока
   * @param {Array|Number} answer Ответ игрока
   */
  setAnswer(answer) {
    this._saveAnswer(answer);
    this._recountLives();
    this._changeLevel();
    this._state.bonusTimeLeft = NEW_GAME.bonusTimeLeft;
  }

  /**
   * Запуск таймеров
   */
  startTimers() {
    this._timer = setTimeout(() => {
      this._tick();
    }, Timer.DATE_MS_TO_SEC_MULTIPLY);
  }

  /**
   * Остановка таймеров
   */
  stopTimers() {
    clearTimeout(this._timer);
  }

  /**
   * Слушатель на обновление основного таймера
   */
  onUpdateTimer() {

  }

  /**
   * Слушатель на истечение таймера
   */
  onTimeLeft() {

  }

}

