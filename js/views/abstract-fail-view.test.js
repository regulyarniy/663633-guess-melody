import {assert} from 'chai';
import testSet from '../services/test-set';
import AbstractFailView from './abstract-fail-view';

testSet();

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
