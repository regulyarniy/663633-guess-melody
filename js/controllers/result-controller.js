import {changeScreen} from "../services/utils";
import SuccessView from "../views/success-view";
import {NEW_GAME} from "../constants/constants";
import AbstractController from "./abstract-controller";

export default class ResultController extends AbstractController {
  /**
   * Класс контроллера страницы результатов
   * @param {model} model Модель
   * @param {Object} context Обьект контекста
   */
  constructor(model, context) {
    super(model, context);
    this._data = {};
    this._view = null;
  }

  /**
   * Старт контроллера
   */
  init() {
    this._bind();
    this._model.loadPastResults();
  }

  /**
   * Связывание обработчиков
   */
  _bind() {

    this._model.onResultSend = () => {
      this._data.score = this._model.score;
      this._data.bonusScore = this._model.bonusScore;
      this._data.mistakes = NEW_GAME.livesLeft - this._model.state.livesLeft;
      this._data.rating = this._model.rating;
      this._data.time = NEW_GAME.timeLeft - this._model.state.timeLeft;

      this._view = new SuccessView(this._data);

      changeScreen(this._view.element);

      this._view.onResetGame = () => {
        this._context.Router.showWelcome(this._model, this._context);
      };

      // Ошибки загрузки\отправки
      this._model.onError = (error) => {
        this._context.Router.showError(error);
      };
    };
  }

}
