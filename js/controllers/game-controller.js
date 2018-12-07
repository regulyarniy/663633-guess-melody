import GameGenreView from '../views/game-genre-view';
import GameArtistView from '../views/game-artist-view';
import {changeScreen} from "../services/utils";

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
  showQuestion() {
    if (this.model.isCurrentQuestionAboutGenre) {
      this.view = new GameGenreView(this.model.questionData);
    } else {
      this.view = new GameArtistView(this.model.questionData);
    }

    this.bind();
    changeScreen(this.view.element);
    this.view.startBonusTimerAnimation(this.model.state.bonusTimeLeft);
  }

  /**
   * Связывание обработчиков
   */
  bind() {
    this.view.onAnswer = (answers) => {
      this.model.setAnswer(answers);
      this.showNextQuestion();
    };

    this.view.onResetGame = () => {
      this.restartGame();
    };

    this.model.onUpdateTimer = () => {
      this.view.updateTimer(this.model.timeLeft);
    };
  }

  /**
   * Показать следующий вопрос
   */
  showNextQuestion() {
    if (!(this.model.state.currentLevel === -1)) {
      this.showQuestion();
    } else if (this.model.state.livesLeft > 0) {
      this.showResults();
    } else {
      this.showFail();
    }
  }

  /**
   * Перейти к результатам
   */
  showResults() {

  }

  /**
   * Перейти к проигрышу
   */
  showFail() {

  }

  /**
   * Перезапустить игру
   */
  restartGame() {

  }


}
