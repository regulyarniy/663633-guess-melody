import AbstractGameView from "./abstract-game-view";
import ArtistView from "./artist-view";

export default class GameArtistView extends AbstractGameView {
  /**
   * Класс представления игры на угадывание артиста
   * @param {Object} data Обьект c данными для представления
   */
  constructor(data) {
    super(data);
    this._playButton = null;
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
      <button class="track__button track__button--play" data-src="${this.question.src}" type="button"></button>
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
    this.question.answers.forEach((artist, index) => {
      const artistInstance = new ArtistView(artist, index);
      this._artistInstances.push(artistInstance);
      // Подписываемся на слушатель ответа
      artistInstance.onAnswer = (isCorrect) => {
        this.answer = isCorrect; // Меняем ответ
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

    // play audio
    this._playButton = this.element.querySelector(`.track__button`);
    const url = this._playButton.dataset.src;
    this.toggleAudio(this._playButton, url);

    this._playButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.toggleAudio(this._playButton, url);
    });
  }

  /** Слушатель на событие ответа
   */
  onAnswer() {

  }

  /** Слушатель на событие сброса игры
   */
  onResetGame() {

  }
}
