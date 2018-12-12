import {NEW_GAME, Settings, Timer, ScoreSettings, RatingSettings} from '../constants/constants';

export default class GameModel {
  /**
   * Модель игры
   */
  constructor() {
    this._questions = [];
    this._state = null;
    this.audios = {};
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
    return this._questions;
  }

  /**
   * Данные для вопроса
   * @return {*}
   */
  get questionData() {
    return {state: this.state, question: this._currentQuestion};
  }

  /**
   * Возвращает текущий вопрос
   * @return {Object} Обьект с данными вопроса
   */
  get _currentQuestion() {
    return this.questions[this._state.currentLevel];
  }

  /**
   * Возвращает, является ли текущий вопрос о жанре, или об артисте
   * @return {boolean} true если вопрос о жанре
   */
  get isCurrentQuestionAboutGenre() {
    return this._currentQuestion.type === `genre`;
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
   * Загружает вопросы с сервера
   * @private
   */
  loadQuestions() {
    const URL = `https://es.dump.academy/guess-melody/questions`;
    const whenQuestionsLoaded = fetch(URL);

    whenQuestionsLoaded.
      then((response)=> {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
      }).
      then((data) => {
        this._questions = [...data];
        this.loadAudio(); // Загружаем треки после загрузки вопросов
      }).
      catch(); // TODO call modal
  }

  /**
   * Загружает треки из вопросов в кэш
   */
  loadAudio() {
    // Создаем массив URL треков
    const audioURLS = new Set();
    this.questions.forEach((question) => {
      if (question.src) {
        audioURLS.add(question.src);
      } else {
        const genreAudioURLs = question.answers.map((answer) => {
          return answer.src;
        });
        genreAudioURLs.forEach((url) => {
          audioURLS.add(url);
        });
      }
    });

    /**
     * Функция предзагрузки аудио
     * @param {string} url Ссылка на аудио
     * @return {Promise} Возвращает Promise
     */
    const preloadAudio = (url) => {
      return new Promise((onSuccess, onFail) => {
        const audio = new Audio();
        audio.addEventListener(`canplaythrough`, () => {
          onSuccess();
        }, false);
        audio.addEventListener(`error`, (event) => {
          onFail(event); // TODO error handle
        });
        audio.src = url;
        this.audios[url] = audio;
      });

    };
    const loadingAudios = [];
    audioURLS.forEach((url)=> {
      loadingAudios.push(preloadAudio(url));
    });
    Promise.all(loadingAudios)
      .then(this.onAudioLoaded);

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
    // Остановить все треки и перемотать на начало
    Object.keys(this.audios).forEach((key) => {
      this.audios[key].pause();
      this.audios[key].currentTime = 0;
    });
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
      const equalAnswers = this._currentQuestion.answers.map((value, index) => {
        return (value.genre === this._currentQuestion.genre) === answer[index];
      });
      isAnswerFalse = equalAnswers.some((item) => {
        return item === Settings.FAILED_ANSWER;
      });
    } else { // Игра на артиста
      isAnswerFalse = answer !== Settings.SUCCESS_ANSWER;
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

  /**
   * Слушатель на окончание загрузки треков
   */
  onAudioLoaded() {

  }

}

