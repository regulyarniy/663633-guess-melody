import {assert} from 'chai';
import {convertTimeCounterToPluralString} from './utils';

describe(`Функция склонения числительных`, () => {
  it(`возвращает 'секунду' для 1 секунды`, () => {
    assert.equal(convertTimeCounterToPluralString(1, `секунд`), `секунду`);
  });
  it(`возвращает 'секунды' для 2 секунд`, () => {
    assert.equal(convertTimeCounterToPluralString(2, `секунд`), `секунды`);
  });
  it(`возвращает 'секунд' для 10 секунд`, () => {
    assert.equal(convertTimeCounterToPluralString(10, `секунд`), `секунд`);
  });
});
