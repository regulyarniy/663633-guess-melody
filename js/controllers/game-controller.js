import GameGenreView from '../views/game-genre-view';
import GameArtistView from '../views/game-artist-view';
import {changeScreen} from "../services/utils";
import Router from "../services/router";
import {FailCases} from "../constants/constants";

export default class GameController {
  /**
   * Класс контроллера игры
   * @param {model} model Модель
   */
  constructor(model) {
    this.model = model;
    this.view = null;
  }

  /**
   * Метод начала игры
   */
  init() {
    if (this.model.isCurrentQuestionAboutGenre) {
      this.view = new GameGenreView(this.model.questionData);
    } else {
      this.view = new GameArtistView(this.model.questionData);
    }

    this.bind();
    changeScreen(this.view.element);
    this.view.startBonusTimerAnimation(this.model.state.timeLeft); // TODO отрисовка начального положения таймера
    this.model.startTimers();
  }

  /**
   * Связывание обработчиков
   */
  bind() {
    // Ответ игрока
    this.view.onAnswer = (answers) => {
      this.model.stopTimers();
      this.model.setAnswer(answers);
      this.showNextQuestion();
    };

    // Сброс игры // TODO сначала вызвать модалку
    this.view.onResetGame = () => {
      this.model.stopTimers();
      this.restartGame();
    };

    // Обновление таймера
    this.model.onUpdateTimer = () => {
      this.view.updateTimer(this.model.state.timeLeft);
    };

    // Истечение времени
    this.model.onTimeLeft = () => {
      this.model.stopTimers();
      this.showFail(FailCases.BY_TIME);
    };
  }


  /**
   * Показать следующий вопрос
   */
  showNextQuestion() {
    if (!(this.model.state.currentLevel === -1)) {
      this.init();
    } else if (this.model.state.livesLeft > 0) {
      this.showResults();
    } else {
      this.model.stopTimers();
      this.showFail(FailCases.BY_TRIES);
    }
  }

  /**
   * Перейти к результатам
   */
  showResults() {
    Router.showResult(this.model);
  }

  /**
   * Перейти к проигрышу
   * @param {boolean} isTimeFail Проигрыш по времени?
   */
  showFail(isTimeFail) {
    Router.showFail(isTimeFail);
  }

  /**
   * Перезапустить игру
   */
  restartGame() {
    Router.showWelcome();
  }


}
