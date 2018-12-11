import {changeScreen} from "../services/utils";
import WelcomeView from "../views/welcome-view";
import AbstractController from "./abstract-controller";

export default class WelcomeController extends AbstractController {
  /**
   * Класс контроллера страницы приветствия
   * @param {*} model Модель
   * @param {Object} context Обьект контекста
   */
  constructor(model, context) {
    super(model, context);
    this._view = new WelcomeView();
  }

  /**
   * Старт контроллера
   */
  init() {
    this._model.loadQuestions();
    this._bind();
    changeScreen(this._view.element);
  }

  /**
   * Связывание обработчиков
   */
  _bind() {
    this._view.onStartGame = () => {
      this._model.startNewGame();
      this._context.Router.showGame(this._model, this._context);
    };

    this._model.onQuestionsLoaded = () => {
      this._view.enableStartGame();
    };
  }

}
