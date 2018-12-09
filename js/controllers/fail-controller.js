import {changeScreen} from "../services/utils";
import Router from "../services/router";
import FailTriesView from "../views/fail-tries-view";
import FailTimeView from "../views/fail-time-view";


export default class FailController {
  /**
   * Класс контроллера страницы проигрыша
   * @param {gameModel} model Модель игры
   * @param {boolean} isTimeFail Проигрыш по времени?
   */
  constructor(model, isTimeFail) {
    this.model = model;
    this.view = isTimeFail ? new FailTimeView() : new FailTriesView();
  }

  /**
   * Старт контроллера
   */
  init() {
    this.bind();
    changeScreen(this.view.element);
  }

  /**
   * Связывание обработчиков
   */
  bind() {
    this.view.onResetGame = () => {
      this.model.startNewGame();
      Router.showGame(this.model);
    };
  }
}
