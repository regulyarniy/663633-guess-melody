import ModalErrorView from "../views/modal-error-view";
import {changeScreen} from "../services/utils";

export default class ErrorController {
  /**
   * Класс контроллера для страницы ошибки
   * @param {Error} error Обьект Response.error
   */
  constructor(error) {
    this._error = error;
    this._view = new ModalErrorView(this._error);
  }

  /**
   * Старт контроллера
   */
  init() {
    changeScreen(this._view.element);
  }

}
