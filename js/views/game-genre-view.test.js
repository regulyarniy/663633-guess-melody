import {assert} from 'chai';
import testSet from '../services/test-set';
import GameGenreView from './game-genre-view';

testSet();

describe(`Класс представления игры на жанр'`, () => {
  const data = {
    genre: `инди-поп`,
    tracks: [
      {id: 1, audioURL: `https://www.y.com/`},
      {id: 2, audioURL: `https://www.y.com/`},
      {id: 3, audioURL: `https://www.y.com/`},
      {id: 4, audioURL: `https://www.y.com/`}
    ],
    livesLeft: 2,
    timeLeft: 50,
    bonusTimeLeft: 30
  };
  const gameGenreView = new GameGenreView(data);

  it(`метод render() возвращает правильную разметку`, () => {
    assert.equal(gameGenreView.render().outerHTML, `<section class="main"><header class="game__header"><a class="game__back" href="#">
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
  </div></header><section class="game game--genre">

  <section class="game__screen">
    <h2 class="game__title">Выберите инди-поп треки</h2>
    <form class="game__tracks"><div class="track"><button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="https://www.y.com/"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="1" id="answer-1">
    <label class="game__check" for="answer-1">Отметить</label>
  </div></div><div class="track"><button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="https://www.y.com/"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="2" id="answer-2">
    <label class="game__check" for="answer-2">Отметить</label>
  </div></div><div class="track"><button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="https://www.y.com/"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="3" id="answer-3">
    <label class="game__check" for="answer-3">Отметить</label>
  </div></div><div class="track"><button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="https://www.y.com/"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="4" id="answer-4">
    <label class="game__check" for="answer-4">Отметить</label>
  </div></div>
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
</section></section>`);
  });

  it(`слушатель onResetGame всплывает из блока статуса`, () => {
    let gameReseted = false;
    document.body.innerHTML = ``;
    document.body.appendChild(gameGenreView.element);
    gameGenreView.onResetGame = () => {
      gameReseted = true;
    };
    const button = document.querySelector(`.game__back`);
    button.click();
    assert.equal(gameReseted, true);
  });

  it(`клик по чекбоксу в треке меняет массив ответов`, () => {
    const testAnswers = gameGenreView.answers.slice();
    testAnswers[0] = true;
    document.body.innerHTML = ``;
    document.body.appendChild(gameGenreView.element);
    const button = document.querySelector(`.game__check[for=answer-1]`);
    button.click();
    assert.deepEqual(gameGenreView.answers, testAnswers);
  });

  it(`клик по кнопке 'Ответить' вызывает событие onAnswer`, () => {
    let gameAnswered = false;
    document.body.innerHTML = ``;
    document.body.appendChild(gameGenreView.element);
    gameGenreView.onAnswer = () => {
      gameAnswered = true;
    };
    const button = document.querySelector(`.game__submit`);
    button.click();
    assert.equal(gameAnswered, true);
  });

  it(`в событие onAnswer первым аргументом попадает массив ответов`, () => {
    let gameAnswers = [];
    document.body.innerHTML = ``;
    document.body.appendChild(gameGenreView.element);
    gameGenreView.onAnswer = (answers) => {
      gameAnswers = answers.slice();
    };
    const button = document.querySelector(`.game__submit`);
    button.click();
    assert.deepEqual(gameAnswers, gameGenreView.answers);
  });

});
