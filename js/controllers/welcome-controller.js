import {changeScreen} from "../services/utils";
import WelcomeView from "../views/welcome-view";
import Router from "../services/router";

export default class WelcomeController {
  /**
   * Класс контроллера страницы приветствия
   */
  constructor() {
    this.view = new WelcomeView();
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
    this.view.onStartGame = () => {
      Router.showGame();
    };
  }

}
