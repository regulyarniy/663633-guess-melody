import AbstractGameView from './abstract-game-view';
import TrackView from './track-view';

export default class GameGenreView extends AbstractGameView {
  /**
   * Класс представления игры на жанр
   * @param {Object} data Обьект c данными для представления
   */
  constructor(data) {
    super(data);
    this.initializeTracks();
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<section class="game game--genre">

  <section class="game__screen">
    <h2 class="game__title">Выберите ${this.genre} треки</h2>
    <form class="game__tracks">
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
</section>`;
  }

  /**
   * Генерирует треки
   */
  initializeTracks() {
    this._trackInstances = [];
    this.tracks.forEach((data) => {
      this._trackInstances.push(new TrackView((data)));
    });
  }

  /**
   * Создает DOM-элемент из разметки
   * @return {HTMLElement}
   */
  render() {
    // Добавляем треки в разметку
    const resultTemplate = super.render();
    const form = resultTemplate.querySelector(`.game__tracks`);
    this._trackInstances.reverse().forEach((instance) => {
      const firstChildInForm = form.firstChild;
      form.insertBefore(instance.element, firstChildInForm);
    });
    return resultTemplate;
  }

  /**
   * Добавляет обработчики
   */
  bind() {
    super.bind();
  }

  /** Слушатель на событие сброса игры
   */
  onResetGame() {

  }

  /** Слушатель на событие ответа
   */
  onAnswer() {

  }
}
