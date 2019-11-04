import Service from "../services/service";

export default class AbstractController {
  /**
   * Базовый класс для контроллеров
   * @param {*} model Модель
   */
  constructor(model) {
    this._model = model;
    const Router = Service.discover(`router`);
    this._router = new Router();
  }

}
