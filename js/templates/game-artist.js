// Экран игры на выбор исполнителя
import utils from '../services/utils';
import gameHeader from './game-header';
import gameplay from '../gameplay/gameplay';
import audio from '../audio';

const GameArtist = function (context) {
  const {render, game} = context;

  // Генерируем шаблон
  const getArtistTemplate = (data) => {
    return `
<div class="artist">
  <input class="artist__input visually-hidden" type="radio" name="answer" value="${data.id}" id="answer-${data.id}">
  <label class="artist__name" for="answer-${data.id}">
    <img class="artist__picture" src="${data.pictureURL}" alt="${data.artist}">
    ${data.artist}
  </label>
</div>
`;
  };
  const tracks = context.ANSWERS_DATA[game.currentLevel].answers;
  const audioURL = context.ANSWERS_DATA[game.currentLevel].audioURL;
  const artistsTemplate = tracks.reduce((accumulator, currentValue) => {
    return accumulator + getArtistTemplate(currentValue);
  }, ``);
  const template = `
<section class="game game--artist">
  ${gameHeader(context)}

  <section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio src="${audioURL}"></audio>
    </div>

    <form class="game__artist">
      ${artistsTemplate}
    </form>
  </section>
</section>
`;
  const fragment = utils.generateFragment(template);

  // Кешируем элементы шаблона
  const form = fragment.querySelector(`.game__artist`);
  const answerElements = form.elements[`answer`];
  const buttonBack = fragment.querySelector(`.game__back`);

  // Инициализируем кнопки проигрывания
  audio.initializeTracks(`.track__button`, `audio`, fragment);

  // Переход к следующему экрану
  answerElements.forEach(function (item) {
    item.addEventListener(`click`, function (e) {
      e.preventDefault();
      const answer = e.target.value;
      const isAnswerSuccessful = gameplay.checkAnswerByArtist(context.ANSWERS_DATA[context.game.currentLevel].answers, answer);
      const playerAnswer = {success: isAnswerSuccessful, time: 35}; // TODO implement time count
      context.game.answers.push(playerAnswer);
      context.game.livesLeft = gameplay.countLives(playerAnswer, context.game.livesLeft);
      context.game.currentLevel = gameplay.changeLevel(game.currentLevel, game.livesLeft);
      if (!(context.game.currentLevel === -1)) {
        render(gameplay.getGameMode(context.ANSWERS_DATA[context.game.currentLevel]), context);
      } else if (context.game.livesLeft > 0) {
        render(`ResultSuccess`, context);
      } else {
        render(`FailTries`, context);
      }
    });
  });

  // Возврат на экран приветствия
  buttonBack.addEventListener(`click`, function (e) {
    e.preventDefault();
    render(`Welcome`, context);
  });

  // Метод возвращает разметку
  this.generate = function () {
    return fragment;
  };
};

export default GameArtist;
