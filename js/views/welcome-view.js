import AbstractView from "./abstract-view";

export default class WelcomeView extends AbstractView {
  /**
   * Класс для представления начального экрана
   */
  constructor() {
    super();
  }

  /**
   * Возвращает разметку
   * @return {string} Строка с разметкой
   */
  get template() {
    return `
<section class="welcome">
  <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <button class="welcome__button welcome__button--loading" disabled><span class="visually-hidden">Начать игру</span></button>
  <h2 class="welcome__rules-title">Правила игры</h2>
  <p class="welcome__text">Правила просты:</p>
  <ul class="welcome__rules-list">
    <li>За 5 минут нужно ответить на все вопросы.</li>
    <li>Можно допустить 3 ошибки.</li>
  </ul>
  <p class="welcome__text">Удачи!</p>
</section>
`;
  }

  /**
   * Активирует кнопку старта игры
   */
  enableStartGame() {
    this._buttonPlay.removeAttribute(`disabled`);
    this._buttonPlay.classList.remove(`welcome__button--loading`);
  }

  /**
   * Привязывает обработчики
   */
  bind() {
    // Старт игры
    this._buttonPlay = this.element.querySelector(`.welcome__button`);
    this._buttonPlay.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onStartGame();
    });
  }

  /**
   * Слушатель на старт игры
   */
  onStartGame() {

  }
}
