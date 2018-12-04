import {assert} from 'chai';
import testSet from '../services/test-set';
import FailTimeView from './fail-time-view';

testSet();

describe(`Класс экрана проигрыша по времени`, () => {
  const failTimeView = new FailTimeView();

  it(`метод render() возвращает правильную разметку`, () => {
    assert.equal(failTimeView.render().outerHTML, `<section class="main"><section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Увы и ах!</h2>
  <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section></section>`);
  });
});
