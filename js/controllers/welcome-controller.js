import {changeScreen} from "../services/utils";
import WelcomeView from "../views/welcome-view";
import Router from "../services/router";

export default class WelcomeController {
  /**
   * Класс контроллера страницы приветствия
   * @param {GameModel} model Модель игры
   */
  constructor(model) {
    this._model = model;
    this._view = new WelcomeView();
  }

  /**
   * Старт контроллера
   */
  init() {
    this._model.loadQuestions();
    this.bind();
    changeScreen(this._view.element);
  }

  /**
   * Связывание обработчиков
   */
  bind() {
    this._view.onStartGame = () => {
      this._model.startNewGame();
      Router.showGame(this._model);
    };

    this._model.onQuestionsLoaded = () => {
      this._view.enableStartGame();
    };
  }

}
