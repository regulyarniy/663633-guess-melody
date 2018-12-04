import {assert} from 'chai';
import testSet from '../services/test-set';
import AbstractGameView from './abstract-game-view';

testSet();

describe(`Базовый класс для основных экранов игры`, () => {
  const TestView = class TestView extends AbstractGameView {
    get template() {
      return `<section class="game"><section class="game__screen">test</section></section>`;
    }
  };
  const data = {
    livesLeft: 2,
    timeLeft: 50,
    bonusTimeLeft: 30
  };
  const testView = new TestView(data);

  it(`метод render() возвращает разметку со статусом игры и тестовым шаблоном`, () => {
    assert.equal(testView.render().outerHTML, `<section class="main"><section class="game"><header class="game__header"><a class="game__back" href="#">
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
  </div></header><section class="game__screen">test</section></section></section>`);
  });

  it(`имеет абстрактный  метод onResetGame`, () => {
    assert.throws(() => {
      testView.onResetGame();
    }, `You have to implement the method 'onResetGame'!`);
  });

  it(`имеет абстрактный  метод onResetGame`, () => {
    assert.throws(() => {
      testView.onAnswer();
    }, `You have to implement the method 'onAnswer'!`);
  });

  it(`событие onResetGame всплывает из блока статуса`, () => {
    let test = false;
    document.body.innerHTML = ``;
    document.body.appendChild(testView.element);
    testView.onResetGame = () => {
      test = true;
    };
    const button = document.querySelector(`.game__back`);
    button.click();
    assert.equal(test, true);
  });
});
