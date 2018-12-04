export default class AbstractView {
  /** Базовый класс для представлений
   * @constructor
   * @param {string} [wrapperTag = `section`] Тег для обертки
   * @param {Array} [wrapperClasses = [`main`]] Массив с классами для обертки
   */
  constructor(wrapperTag = `section`, wrapperClasses = [`main`]) {
    this.wrapperTag = wrapperTag;
    this.wrapperClasses = wrapperClasses;
  }

  /** Возвращает разметку
   * @abstract
   */
  get template() {
    throw new Error(`You have to implement the method 'template'!`);
  }

  /**
   * Возвращает DOM-элемент с обработчиками
   * @return {HTMLElement}
   */
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  /**
   * Создает DOM-элемент из разметки
   * @return {HTMLElement}
   */
  render() {
    const wrapper = document.createElement(this.wrapperTag);
    wrapper.innerHTML = this.template.trim();
    this.wrapperClasses.forEach((item) => {
      wrapper.classList.add(item);
    });
    return wrapper;
  }

  /** Добавляет обработчики событий
   * @abstract
   */
  bind() {
    throw new Error(`You have to implement the method 'bind'!`);
  }
}
