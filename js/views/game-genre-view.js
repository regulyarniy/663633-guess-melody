import AbstractGameView from './abstract-game-view';
import TrackView from './track-view';
import {Settings} from "../constants/constants";

export default class GameGenreView extends AbstractGameView {
  /**
   * Класс представления игры на жанр
   * @param {Object} data Обьект c данными для представления
   */
  constructor(data) {
    super(data);
    this.answers = [];
    this.initializeTracks();
  }

  /** Шаблон
   * @return {string} Возвращает разметку
   */
  get template() {
    return `<section class="game game--genre">

  <section class="game__screen">
    <h2 class="game__title">${this.question.question}</h2>
    <form class="game__tracks">
      <button class="game__submit button" disabled="" type="submit">Ответить</button>
    </form>
  </section>
</section>`;
  }

  /**
   * Возвращает элемент кнопки ответа
   * @return {HTMLElement}
   */
  get buttonAnswer() {
    if (!this._buttonAnswer) {
      this._buttonAnswer = this.element.querySelector(`.game__submit`);
    }
    return this._buttonAnswer;
  }

  /**
   * Возвращает элементы кнопок проигрывания
   * @return {HTMLElement}
   */
  get playButtons() {
    if (!this._playButtons) {
      this._playButtons = this.element.querySelectorAll(`.track__button`);
    }
    return this._playButtons;
  }

  /**
   * Генерирует треки
   */
  initializeTracks() {
    this._trackInstances = [];
    this.question.answers.forEach((track, index) => {
      const isValid = track.genre === this.question.genre;
      const trackInstance = new TrackView(track, index, isValid);
      this._trackInstances.push(trackInstance);
      const answerIndexOfInstance = this.answers.length;
      this.answers.push(Settings.NEGATIVE_ANSWER); // Создаем ответ в массиве ответов
      // Подписываемся на слушатель отметки трека
      trackInstance.onChangeAnswer = () => {
        this.answers[answerIndexOfInstance] = !this.answers[answerIndexOfInstance]; // Меняем ответ
        // Кнопка неактивна если не выбран ответ
        const answered = this.answers.some((item) => item === Settings.POSITIVE_ANSWER);
        this.buttonAnswer.toggleAttribute(`disabled`, !answered);
      };
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

    // Ответ пользователя
    this.buttonAnswer.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.onAnswer(this.answers);
    });

    // play audio
    this.playButtons.forEach((button) => {
      button.addEventListener(`click`, (event) => {
        event.preventDefault();
        if (this.playingURL !== button.dataset.src) {
          this._pauseAllAudio();
        }
        this.toggleAudio(button, button.dataset.src);
      });
    });

    // Проигрываем первый трек
    this.toggleAudio(this.playButtons[0], this.playButtons[0].dataset.src);
  }

  /**
   * Переводит все кнопки вопроизведения в паузу
   * @param {NodeList} playButtons
   */
  _pauseAllAudio() {
    this.playButtons.forEach((button) => {
      AbstractGameView.pauseAudio(button);
      this.onPauseAudio(button.dataset.src);
    });
    this.isAudioPlaying = false;
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
