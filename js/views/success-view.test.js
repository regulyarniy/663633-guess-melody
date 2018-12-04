import {assert} from 'chai';
import testSet from '../services/test-set';
import SuccessView from './success-view';

testSet();

describe(`Класс экрана выигрыша и вывода результатов`, () => {
  const data = {
    time: 75,
    score: 12,
    bonusScore: 4,
    mistakes: 2,
    rating: `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`
  };
  const successView = new SuccessView(data);

  it(`метод render() возвращает правильную разметку`, () =>{
    assert.equal(successView.render().outerHTML, `<section class="main"><section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Вы настоящий меломан!</h2>
  <p class="result__total">За 1 минуту и 15 секунд вы набрали 12 баллов (4 быстрых), совершив 2 ошибки</p>
  <p class="result__text">Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков</p>
  <button class="result__replay" type="button">Сыграть ещё раз</button>
</section></section>`);
  });
});
