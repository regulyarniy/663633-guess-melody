export default class AbstractController {
  /**
   * Базовый класс для контроллеров
   * @param {*} model Модель
   * @param {Object} context Обьект контекста
   */
  constructor(model, context) {
    this._model = model;
    this._context = context;
  }

}
