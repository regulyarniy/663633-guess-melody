import GameGenreView from '../views/game-genre-view';
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

  startGame() {
    if (this.model.isCurrentQuestionAboutGenre) {
      this.view = new GameGenreView({
        genre: this.model.currentQuestion.genre,
        tracks: this.model.currentQuestion.answers,
        livesLeft: this.model.state.livesLeft,
        timeLeft: this.model.state.timeLeft,
        bonusTimeLeft: this.model.state.bonusTimeLeft
      });
    } else {
      this.view = new GameGenreView({
        audioURL: this.model.currentQuestion.audioURL,
        artists: this.model.currentQuestion.answers,
        livesLeft: this.model.state.livesLeft,
        timeLeft: this.model.state.timeLeft,
        bonusTimeLeft: this.model.state.bonusTimeLeft
      });
    }

    this.view.onAnswer = (answers) => {
      this.model.setAnswer(answers);
    };

    this.view.onResetGame = () => {
      context.templates.welcome(context);
    };
  }

  changeLevel() {

  }

  endGame() {

  }


}
