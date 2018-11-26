export default {
  /**
   * Инициализация кнопок проигрывания треков
   * @param {String} buttonsSelector CSS-селектор кнопок управления
   * @param {String} audioSelector CSS-селектор элементов audio
   * @param {HTMLElement} fragment Родительский узел
   */
  initializeTracks(buttonsSelector, audioSelector, fragment) {
    const audioButtons = fragment.querySelectorAll(buttonsSelector);
    const audioElements = fragment.querySelectorAll(audioSelector);

    /**
     * Добавление обработчиков на кнопки проигрывания
     * @param {NodeList} buttons Список узлов кнопок
     * @param {NodeList} tracks Список узлов audio
     */
    const addTracksListeners = (buttons, tracks) => {
      buttons.forEach((button, index) => {
        button.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          if (evt.target.classList.contains(`track__button--play`)) {
            evt.target.classList.remove(`track__button--play`);
            evt.target.classList.add(`track__button--pause`);
            tracks[index].play();
          } else {
            evt.target.classList.add(`track__button--play`);
            evt.target.classList.remove(`track__button--pause`);
            tracks[index].pause();
          }
        });
      });
    };

    addTracksListeners(audioButtons, audioElements);
  }
};
