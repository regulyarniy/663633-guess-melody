import {assert} from 'chai';
import jsdom from 'mocha-jsdom';
import AbstractView from './abstract-view';

// Переопределяем асбтрактные методы
const TestView = class TestView extends AbstractView {
  constructor(wrapperTag = `div`, wrapperClasses = [`test`]) {
    super(wrapperTag, wrapperClasses);
  }

  get template() {
    return `<p>test</p>`;
  }

  bind() {
    throw new Error(`bind executed`);
  }
};

describe(`Класс AbstractView`, () => {
  jsdom({
    url: `http://localhost/`
  });

  const abstractView = new AbstractView();
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

  // Потомок с переопределенными свойствами
  const testView = new TestView();

  it(`метод render возвращает разметку`, () => {
    assert.equal(testView.render().outerHTML, `<div class="test"><p>test</p></div>`);
  });

  it(`геттер element вызывает bind при первом обращении`, () => {
    assert.throws(() => {
      document.body.appendChild(testView.element);
    }, `bind executed`);
  });

  it(`геттер element не вызывает bind при последующих обращениях`, () => {
    assert(() => {
      document.body.appendChild(testView.element);
    }, `element не кешируется!`);
  });

});
