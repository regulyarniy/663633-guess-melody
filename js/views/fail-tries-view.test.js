import {assert} from 'chai';
import FailTriesView from './fail-tries-view';
import jsdom from 'jsdom';

const {JSDOM} = jsdom;
const {document} = new JSDOM(`<!doctype html><html><body></body></html>`).window;
global.document = document;
global.window = document.defaultView;

describe(`Класс экрана проигрыша по попыткам`, () => {
  const failTriesView = new FailTriesView();

  it(`метод render() возвращает правильную разметку`, () => {
    assert.equal(failTriesView.render().outerHTML, `<section class="main"><section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Какая жалость!</h2>
  <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section></section>`);
  });
});
