export default class AbstractView {
  /** Базовый класс для представлений
   * @constructor
   */
  constructor() {

  }

  /** Возвращает разметку
   * @abstract
   */
  get template() {
    throw new Error(`You have to implement the method 'template'!`);
  }

  render() {
    const wrapper = document.createElement(`section`);
    wrapper.innerHTML = this.template.trim();
    wrapper.classList.add(`main`);
    return wrapper;
  }
}
