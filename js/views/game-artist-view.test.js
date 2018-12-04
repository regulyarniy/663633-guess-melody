import {assert} from 'chai';
import testSet from '../services/test-set';
import GameArtistView from './game-artist-view';

testSet();

describe(`Класс представления игры на артиста'`, () => {
  const data = {
    audioURL: `https://www.y.com/`,
    artists: [
      {id: 1, pictureURL: `https://via.placeholder.com/150`, artist: `Пелагея`},
      {id: 2, pictureURL: `https://via.placeholder.com/50`, artist: `Scooter`},
      {id: 3, pictureURL: `https://via.placeholder.com/10`, artist: `Prodigy`}
    ],
    livesLeft: 2,
    timeLeft: 50,
    bonusTimeLeft: 30
  };
  const gameArtistView = new GameArtistView(data);

  it(`метод render() возвращает правильную разметку`, () => {
    assert.strictEqual(gameArtistView.render().outerHTML, `<section class="main"><section class="game game--artist">
  <header class="game__header"><a class="game__back" href="#">
    <span class="visually-hidden">Сыграть ещё раз</span>
    <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
  </a>

  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>

  <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer__mins">05</span>
    <span class="timer__dots">:</span>
    <span class="timer__secs">00</span>
  </div>

  <div class="game__mistakes">
    <div class="correct"></div><div class="wrong"></div><div class="wrong"></div>
  </div></header><section class="game__screen">
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio src="https://www.y.com/"></audio>
    </div>

    <form class="game__artist"><div class="artist"><input class="artist__input visually-hidden" type="radio" name="answer" value="1" id="answer-1">
  <label class="artist__name" for="answer-1">
    <img class="artist__picture" src="https://via.placeholder.com/150" alt="Пелагея">
    Пелагея
  </label></div><div class="artist"><input class="artist__input visually-hidden" type="radio" name="answer" value="2" id="answer-2">
  <label class="artist__name" for="answer-2">
    <img class="artist__picture" src="https://via.placeholder.com/50" alt="Scooter">
    Scooter
  </label></div><div class="artist"><input class="artist__input visually-hidden" type="radio" name="answer" value="3" id="answer-3">
  <label class="artist__name" for="answer-3">
    <img class="artist__picture" src="https://via.placeholder.com/10" alt="Prodigy">
    Prodigy
  </label></div>
    </form>
  </section>
</section></section>`);
  });

  it(`клик по блоку артиста вызывает событие onAnswer`, () => {
    let gameAnswered = false;
    document.body.innerHTML = ``;
    document.body.appendChild(gameArtistView.element);
    gameArtistView.onAnswer = () => {
      gameAnswered = true;
    };
    const button = document.querySelector(`#answer-1`);
    button.click();
    assert.strictEqual(gameAnswered, true);
  });

  it(`в событие onAnswer первым аргументом попадает id ответа`, () => {
    let answerTest = 3;
    document.body.innerHTML = ``;
    document.body.appendChild(gameArtistView.element);
    gameArtistView.onAnswer = (answerId) => {
      answerTest = answerId;
    };
    const button = document.querySelector(`#answer-2`);
    button.click();
    assert.strictEqual(answerTest, 2);
  });
});
