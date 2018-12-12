import GameGenreView from '../views/game-genre-view';
import GameArtistView from '../views/game-artist-view';
import {changeScreen} from "../services/utils";
import {FailCases} from "../constants/constants";
import AbstractController from "./abstract-controller";

export default class GameController extends AbstractController {
  /**
   * Класс контроллера игры
   * @param {model} model Модель
   * @param {Object} context Обьект контекста
   */
  constructor(model, context) {
    super(model, context);
    this._view = null;
  }

  /**
   * Метод начала игры
   */
  init() {
    if (this._model.isCurrentQuestionAboutGenre) {
      this._view = new GameGenreView(this._model.questionData);
    } else {
      this._view = new GameArtistView(this._model.questionData);
    }

    this._bind();
    changeScreen(this._view.element);
    this._view.startRoundTimerAnimation(this._model.state.timeLeft); // TODO отрисовка начального положения таймера
    this._model.startTimers();
  }

  /**
   * Связывание обработчиков
   */
  _bind() {
    // Ответ игрока
    this._view.onAnswer = (answers) => {
      this._model.stopTimers();
      this._model.setAnswer(answers);
      this._showNextQuestion();
    };

    // Сброс игры // TODO сначала вызвать модалку
    this._view.onResetGame = () => {
      this._model.stopTimers();
      this._restartGame();
    };

    this._view.onPlayAudio = (url) => {
      this._model.audios[url].play();
    };

    this._view.onPauseAudio = (url) => {
      this._model.audios[url].pause();
    };

    // Обновление таймера
    this._model.onUpdateTimer = () => {
      this._view.updateTimer(this._model.state.timeLeft);
    };

    // Истечение времени
    this._model.onTimeLeft = () => {
      this._model.stopTimers();
      this._showFail(FailCases.BY_TIME);
    };
  }


  /**
   * Показать следующий вопрос
   */
  _showNextQuestion() {
    if (!(this._model.state.currentLevel === -1)) {
      this.init();
    } else if (this._model.state.livesLeft > 0) {
      this._showResults();
    } else {
      this._model.stopTimers();
      this._showFail(FailCases.BY_TRIES);
    }
  }

  /**
   * Перейти к результатам
   */
  _showResults() {
    this._context.Router.showResult(this._model, this._context);
  }

  /**
   * Перейти к проигрышу
   * @param {boolean} isTimeFail Проигрыш по времени?
   */
  _showFail(isTimeFail) {
    this._context.Router.showFail(this._model, this._context, isTimeFail);
  }

  /**
   * Перезапустить игру
   */
  _restartGame() {
    this._context.Router.showWelcome(this._model, this._context);
  }
}
