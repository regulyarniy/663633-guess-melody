import {assert} from 'chai';
import jsdom from 'mocha-jsdom';
import AbstractView from './abstract-view';

describe(`Класс AbstractView`, () => {
  jsdom({
    url: `http://localhost/`
  });

  let abstractView = new AbstractView();
  it(`имеет абстрактный геттер template`, () => {
    assert.throws(() => {
      abstractView.template.toString();
    }, `You have to implement the method 'template'!`);
  });

  it(`имеет абстрактный  метод bind`, () => {
    assert.throws(() => {
      abstractView.bind();
    }, `You have to implement the method 'bind'!`);
  });

  it(`имеет геттер element`, () => {
    assert.throws(() => {
      abstractView.element.toString();
    });
  });

  const abstractViewDOM = new AbstractView();
  abstractViewDOM._isTested = true;

  it(`свойство template возвращает строку с тестовой разметкой <p>test</p>`, () => {
    assert.equal(abstractViewDOM.template, `<p>test</p>`);
  });

  it(`метод render возвращает разметку`, () => {
    assert.equal(abstractViewDOM.render().outerHTML, `<section class="main"><p>test</p></section>`);
  });

  it(`метод render возвращает разметку в теге div`, () => {
    assert.equal(abstractViewDOM.render(`div`).outerHTML, `<div class="main"><p>test</p></div>`);
  });

  it(`метод render возвращает разметку cо списком классов`, () => {
    assert.equal(abstractViewDOM.render(undefined, [`test1`, `test2`]).outerHTML, `<section class="test1 test2"><p>test</p></section>`);
  });

  it(`свойство element содержит разметку c обработчиком`, () => {
    assert.equal(abstractViewDOM.element.outerHTML, `<section class="test1 test2"><p>test</p></section>`);
  });


});
