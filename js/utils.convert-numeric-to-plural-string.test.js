import {assert} from 'chai';
import {convertNumericToPluralString} from './utils';

describe(`Функция склонения числительных`, () => {

  it(`возвращает 'секунду' для 1 секунды`, () => {
    assert.equal(convertNumericToPluralString(1, `секунд`), `секунду`);
  });

  it(`возвращает 'секунды' для 2 секунд`, () => {
    assert.equal(convertNumericToPluralString(2, `секунд`), `секунды`);
  });

  it(`возвращает 'секунд' для 10 секунд`, () => {
    assert.equal(convertNumericToPluralString(10, `секунд`), `секунд`);
  });

});
