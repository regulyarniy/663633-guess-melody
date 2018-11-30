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
    if (!this._isTested) {
      throw new Error(`You have to implement the method 'template'!`);
    } else {
      return `<p>test</p>`;
    }
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
   * @param {string} [wrapperTag = `section`] Тег для обертки
   * @param {Array} [wrapperClasses = [`main`]] Массив с классами для обертки
   * @return {HTMLElement}
   */
  render(wrapperTag = `section`, wrapperClasses = [`main`]) {
    const wrapper = document.createElement(wrapperTag);
    wrapper.innerHTML = this.template.trim();
    wrapperClasses.forEach((item) => {
      wrapper.classList.add(item);
    });
    return wrapper;
  }

  /** Добавляет обработчики событий
   * @abstract
   */
  bind() {
    if (!this._isTested) {
      throw new Error(`You have to implement the method 'bind'!`);
    } else {
      this._element.addEventListener(`click`, () => {
        return;
      });
    }
  }
}
