import {changeScreen} from "../services/utils";
import Router from "../services/router";
import SuccessView from "../views/success-view";
import {NEW_GAME} from "../constants/constants";

export default class ResultController {
  /**
   * Класс контроллера страницы результатов
   * @param {GameModel} model Модель игры
   */
  constructor(model) {
    this._model = model;
    this._data = {};
    this.view = null;
  }

  /**
   * Старт контроллера
   */
  init() {
    this._data.score = this._model.score;
    this._data.bonusScore = this._model.bonusScore;
    this._data.mistakes = NEW_GAME.livesLeft - this._model.state.livesLeft;
    this._data.rating = this._model.rating;
    this._data.time = this._model.state.timeLeft;

    this.view = new SuccessView(this._data);

    this.bind();
    changeScreen(this.view.element);
  }

  /**
   * Связывание обработчиков
   */
  bind() {
    this.view.onResetGame = () => {
      Router.showWelcome();
    };
  }


}
