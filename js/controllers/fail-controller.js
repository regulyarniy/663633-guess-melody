import {changeScreen} from "../services/utils";
import Router from "../services/router";
import FailTriesView from "../views/fail-tries-view";
import FailTimeView from "../views/fail-time-view";


export default class FailController {
  /**
   * Класс контроллера страницы проигрыша
   * @param {boolean} isTimeFail Проигрыш по времени?
   */
  constructor(isTimeFail) {
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
      Router.showWelcome();
    };
  }
}
