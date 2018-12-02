import {assert} from 'chai';
import AbstractFailView from './abstract-fail-view';
import jsdom from 'jsdom';

const {JSDOM} = jsdom;
const {document} = new JSDOM(`<!doctype html><html><body></body></html>`).window;
global.document = document;
global.window = document.defaultView;

describe(`Класс AbstractFailView`, () => {

  const TestView = class TestView extends AbstractFailView {
    get template() {
      return `<button class="result__replay" type="button">Попробовать ещё раз</button>`;
    }
  };

  const testView = new TestView();

  it(`нажатие на кнопку 'Попробовать ещё раз' выполняет событие onResetGame`, () => {
    let test = false;
    document.body.appendChild(testView.element);
    testView.onResetGame = () => {
      test = true;
    };
    const button = document.querySelector(`.result__replay`);
    button.click();
    assert.equal(test, true);
  });
});