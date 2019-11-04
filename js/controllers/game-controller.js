import GameGenreView from '../views/game-genre-view';
import GameArtistView from '../views/game-artist-view';
import {changeScreen} from "../services/utils";
import {FailCases, Settings} from "../constants/constants";
import AbstractController from "./abstract-controller";

export default class GameController extends AbstractController {
  /**
   * Класс контроллера игры
   * @param {model} model Модель
   */
  constructor(model) {
    super(model);
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
    this._view.startRoundTimerAnimation(this._model.state.timeLeft);
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

    // Сброс игры
    this._view.onResetGame = () => {
      this._model.stopTimers();
      this._model.rewindAudio();
      this._restartGame();
    };

    // Воспроизведение
    this._view.onPlayAudio = (url) => {
      this._model.rewindAudio();
      this._model.audios[url].play();
    };

    // Пауза
    this._view.onPauseAudio = (url) => {
      this._model.audios[url].pause();
    };

    // Обновление таймера
    this._model.onUpdateTimer = () => {
      this._view.updateTimer(this._model.state.timeLeft);
    };

    // Истечение времени
    this._model.onTimeLeft = () => {
      this._model.rewindAudio();
      this._model.stopTimers();
      this._showFail(FailCases.BY_TIME);
    };

    // Индикация что время подходит к концу
    this._model.onTimeExpires = () => {
      this._view.blinkTimer();
    };

    // Ошибки загрузки\отправки
    this._model.onError = (error) => {
      this._router.showError(error);
    };

  }

  /**
   * Показать следующий вопрос
   */
  _showNextQuestion() {
    if (!(this._model.state.currentLevel === Settings.LEVEL_ENDGAME)) {
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
    this._router.showResult(this._model);
  }

  /**
   * Перейти к проигрышу
   * @param {boolean} isTimeFail Проигрыш по времени?
   */
  _showFail(isTimeFail) {
    this._router.showFail(this._model, isTimeFail);
  }

  /**
   * Перезапустить игру
   */
  _restartGame() {
    this._model.startNewGame();
    this._router.showGame(this._model);
  }
}
