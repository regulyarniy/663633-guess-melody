import {assert} from 'chai';
import AbstractView from './abstract-view';

describe(`Класс AbstractView`, () => {

  let abstractView = new AbstractView();
  it(`имеет абстрактный  метод template`, () => {
    assert.throws(() => {
      abstractView.template.toString();
    }, `You have to implement the method 'template'!`);
  });

  abstractView = new AbstractView();
  it(`имеет метод render`, () => {
    assert.equal(typeof abstractView.render === `function`, true);
  });

  abstractView = new AbstractView();
  it(`имеет абстрактный  метод bind`, () => {
    assert.throws(() => {
      abstractView.bind();
    }, `You have to implement the method 'bind'!`);
  });

});
