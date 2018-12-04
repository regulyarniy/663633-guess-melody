import AbstractView from "./abstract-view";

const classes = {
  PLAY: `track__button--play`,
  PAUSE: `track__button--pause`
};

export default class TrackView extends AbstractView {
  /**
   * Класс представления трека для основного игрового экрана игры на жанр
   * @param {Object} data Данные для представления
   */
  constructor(data) {
    super(`div`, [`track`]);
    Object.assign(this, data);
    this._isPaused = false; // Начальное состояние кнопки проигрывания
  }

  get template() {
    return `<button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="${this.audioURL}"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${this.id}" id="answer-${this.id}">
    <label class="game__check" for="answer-${this.id}">Отметить</label>
  </div>`;
  }

  /**
   * Переключает классы на кнопке проигрывания
   * @param {HTMLElement} element Элемент кнопки
   */
  togglePlayButtonClass(element) {
    element.classList.toggle(classes.PLAY, this._isPaused);
    element.classList.toggle(classes.PAUSE, !this._isPaused);
    this._isPaused = !this.isPaused;
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    // Выбор ответа
    const buttonAnswer = this.element.querySelector(`.game__check`);

    buttonAnswer.addEventListener(`click`, () => {
      this.onChangeAnswer();
    });

    // Проигрывание\пауза
    const buttonControlAudio = this.element.querySelector(`.track__button`);

    buttonControlAudio.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.togglePlayButtonClass(buttonControlAudio);
      this.onControlAudio();
    });
  }

  /**
   * Слушатель на выбор ответа
   */
  onChangeAnswer() {

  }

  /**
   * Слушатель на проигрывание трека
   */
  onControlAudio() {

  }
}
