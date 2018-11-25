// Экран игры на выбор исполнителя
import utils from '../utils';
import gameHeader from './game-header';

const tracks = [
  {id: 1, artist: `Пелагея`, pictureURL: `http://placehold.it/134x134`},
  {id: 1, artist: `Краснознаменная дивизия имени моей бабушки`, pictureURL: `http://placehold.it/134x134`},
  {id: 1, artist: `Lorde`, pictureURL: `http://placehold.it/134x134`}
];
const getArtistTemplate = (data) => `
<div class="artist">
  <input class="artist__input visually-hidden" type="radio" name="answer" value="${data.id}" id="answer-${data.id}">
  <label class="artist__name" for="answer-${data.id}">
    <img class="artist__picture" src="${data.pictureURL}" alt="${data.artist}">
    ${data.artist}
  </label>
</div>
`;

const artistsTemplate = tracks.reduce((accumulator,currentValue) => {
  return accumulator + getArtistTemplate(currentValue);
},``);


const GameArtist = function (screens, render) {

  const template = `
<section class="game game--artist">
  ${gameHeader}

  <section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio></audio>
    </div>

    <form class="game__artist">
      ${artistsTemplate}
    </form>
  </section>
</section>
`;

  const fragment = utils.generateFragment(template);
  const form = fragment.querySelector(`.game__artist`);
  const answerElements = form.elements[`answer`];
  const buttonBack = fragment.querySelector(`.game__back`);

  // Переход на экран победы или проигрыша(случайно)
  answerElements.forEach(function (item) {
    item.addEventListener(`click`, function () {
      let screen = utils.getRandomInt(0, 2);
      screen = screen ? `screenResultSuccess` : `screenFailTries`;
      render(screen, screens);
    });
  });

  // Возврат на экран приветствия
  buttonBack.addEventListener(`click`, function (e) {
    e.preventDefault();
    render(`screenWelcome`, screens);
  });

  this.generate = function () {
    return fragment;
  };
};

export default GameArtist;
