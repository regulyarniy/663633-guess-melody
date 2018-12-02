import {assert} from 'chai';
import testSet from '../services/test-set';
import GameStatusView from './game-status-view';

testSet();

describe(`Класс для представления блока со статусом игры`, () => {
  const data = {
    livesLeft: 2,
    timeLeft: 50,
    bonusTimeLeft: 30
  };
  const gameStatusView = new GameStatusView(data);

  it(`метод render() возвращает правильную разметку`, () => {
    assert.equal(gameStatusView.render().outerHTML, `<header class="game__header"><a class="game__back" href="#">
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
  </div></header>`);
  });

  it(`нажатие на кнопку 'Сыграть ещё раз' выполняет событие onResetGame`, () => {
    let test = false;
    document.body.appendChild(gameStatusView.element);
    gameStatusView.onResetGame = () => {
      test = true;
    };
    const button = document.querySelector(`.game__back`);
    button.click();
    assert.equal(test, true);
  });
});
