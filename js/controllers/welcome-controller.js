import {changeScreen} from "../services/utils";
import WelcomeView from "../views/welcome-view";
import AbstractController from "./abstract-controller";

export default class WelcomeController extends AbstractController {
  /**
   * Класс контроллера страницы приветствия
   * @param {*} model Модель
   */
  constructor(model) {
    super(model);
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
    // Когда пользователь нажал кнопку старта игры
    this._view.onStartGame = () => {
      this._model.startNewGame();
      this._router.showGame(this._model);
    };

    // Когда аудио загружено
    this._model.onAudioLoaded = () => {
      this._view.enableStartGame();
    };

    // Ошибки загрузки\отправки
    this._model.onError = (error) => {
      this._router.showError(error);
    };
  }

}
