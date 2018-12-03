import AbstractGameView from "./abstract-game-view";
import ArtistView from "./artist-view";

export default class GameArtist extends AbstractGameView {
  /**
   * Класс представления игры на угадывание артиста
   * @param {Object} data Обьект c данными для представления
   */
  constructor(data) {
    super(data);
    this.initializeArtists();
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<section class="game game--artist">
  <section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio src="${this.audioURL}"></audio>
    </div>

    <form class="game__artist">
    </form>
  </section>
</section>`;
  }

  /**
   * Вызывает событие при получении ответа
   * @param {Number} answerId ID ответа
   */
  set answer(answerId) {
    this.onAnswer(answerId);
  }

  /**
   * Генерирует блоки артистов
   */
  initializeArtists() {
    this._artistInstances = [];
    this.artists.forEach((data) => {
      const artistInstance = new ArtistView(data);
      this._artistInstances.push(artistInstance);
      // Подписываемся на слушатель ответа
      artistInstance.onAnswer = (answerId) => {
        this.answer = answerId; // Меняем ответ
      };
    });
  }

  /**
   * Создает DOM-элемент из разметки
   * @return {HTMLElement}
   */
  render() {
    // Добавляем артистов в разметку
    const resultTemplate = super.render();
    const form = resultTemplate.querySelector(`.game__artist`);
    this._artistInstances.reverse().forEach((instance) => {
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

  /** Слушатель на событие ответа
   */
  onAnswer() {

  }
}
