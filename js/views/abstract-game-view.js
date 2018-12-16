import AbstractView from './abstract-view';
import GameStatus from './game-status-view';
import ModalConfirmView from "./modal-confirm-view";

export default class AbstractGameView extends AbstractView {
  /**
   * Базовый класс для основных экранов игры
   * @param {Object} data Данные для представления
   */
  constructor(data) {
    super();
    this._isAudioPlaying = false;
    Object.assign(this, data);
    this.initializeGameStatus();
    this.initializeModal();
  }

  /**
   * Генерирует блок статуса игры
   */
  initializeGameStatus() {
    this._statusData = {
      livesLeft: this.state.livesLeft,
      timeLeft: this.state.timeLeft,
      bonusTimeLeft: this.state.bonusTimeLeft};
    this._gameStatus = new GameStatus(this._statusData);
    this._gameStatusTemplate = this._gameStatus.element;
  }

  /**
   * Генерирует блок модального окна
   */
  initializeModal() {
    this._modalConfirm = new ModalConfirmView();
    this._modalConfirmTemplate = this._modalConfirm.element;
  }

  /**
   * Создает DOM-элемент из разметки
   * @return {HTMLElement}
   */
  render() {
    // Добавляем блок статуса перед экраном игры
    const resultTemplate = super.render();
    const gameLayout = resultTemplate.querySelector(`.game`);
    const gameScreen = gameLayout.querySelector(`.game__screen`);
    // Добавляем блок статуса перед экраном игры
    gameLayout.insertBefore(this._gameStatusTemplate, gameScreen);
    // Добавляем блок модального окна
    resultTemplate.appendChild(this._modalConfirmTemplate);
    return resultTemplate;
  }

  /**
   * Добавление обработчиков
   */
  bind() {
    // Модальное окно подтверждения
    this._gameStatus.onResetGame = () => this._modalConfirm.show();
    this._modalConfirm.onConfirm = () => this.onResetGame();
    this._modalConfirm.onCancel = () => this._modalConfirm.hide();
  }

  /**
   * Функция обновления таймера
   * @param {number} timeLeft Количество секунд
   */
  updateTimer(timeLeft) {
    this._gameStatus.updateTimer(timeLeft);
  }

  /**
   * Индикация что время подходит к концу
   */
  blinkTimer() {
    this._gameStatus.blinkTimer();
  }

  /**
   * Функция старта анимации бонусного таймера
   * @param {number} bonusTimeLeft Количество секунд
   */
  startRoundTimerAnimation(bonusTimeLeft) {
    this._gameStatus.startRoundTimerAnimation(bonusTimeLeft);
  }

  _pauseAudio(playButton) {
    playButton.classList.add(`track__button--play`);
    playButton.classList.remove(`track__button--pause`);
  }

  _playAudio(playButton) {
    playButton.classList.remove(`track__button--play`);
    playButton.classList.add(`track__button--pause`);
  }

  _toggleAudio(playButton, url) {
    if (!this._isAudioPlaying) {
      this._playAudio(playButton);
      this.onPlayAudio(url);
    } else {
      this._pauseAudio(playButton);
      this.onPauseAudio(url);
    }
    this._isAudioPlaying = !this._isAudioPlaying;
  }

  /** Слушатель на событие сброса игры
   * @abstract
   */
  onResetGame() {
    throw new Error(`You have to implement the method 'onResetGame'!`);
  }

  /** Слушатель на событие ответа
   * @abstract
   */
  onAnswer() {
    throw new Error(`You have to implement the method 'onAnswer'!`);
  }

  /**
   * Слушатель на событие воспроизведения аудио
   */
  onPlayAudio() {

  }

  /**
   * Слушатель на событие паузы аудио
   */
  onPauseAudio() {

  }
}
