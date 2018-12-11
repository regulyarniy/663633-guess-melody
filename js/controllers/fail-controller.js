import {changeScreen} from "../services/utils";
import FailTriesView from "../views/fail-tries-view";
import FailTimeView from "../views/fail-time-view";
import AbstractController from "./abstract-controller";


export default class FailController extends AbstractController {
  /**
   * Класс контроллера страницы проигрыша
   * @param {GameModel} model Модель игры
   * @param {Object} context Обьект контекста
   * @param {boolean} isTimeFail Проигрыш по времени?
   */
  constructor(model, context, isTimeFail) {
    super(model, context);
    this._view = isTimeFail ? new FailTimeView() : new FailTriesView();
  }

  /**
   * Старт контроллера
   */
  init() {
    this._bind();
    changeScreen(this._view.element);
  }

  /**
   * Связывание обработчиков
   */
  _bind() {
    this._view.onResetGame = () => {
      this._model.startNewGame();
      this._context.Router.showGame(this._model, this._context);
    };
  }
}
