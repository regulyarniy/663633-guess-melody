import {assert} from 'chai';
import {convertSecondsToHumanReadableString} from './utils';

describe(`Функция конвертации количества секунд в строку`, () => {
  it(`возвращает правильную строку для 50 секунд`, () => {
    assert.equal(convertSecondsToHumanReadableString(50), `50 секунд`);
  });
  it(`возвращает правильную строку для 60 секунд`, () => {
    assert.equal(convertSecondsToHumanReadableString(60), `1 минуту и 0 секунд`);
  });
  it(`возвращает правильную строку для 61 секунды`, () => {
    assert.equal(convertSecondsToHumanReadableString(61), `1 минуту и 1 секунду`);
  });
  it(`возвращает правильную строку для 153 секунд`, () => {
    assert.equal(convertSecondsToHumanReadableString(153), `2 минуты и 33 секунды`);
  });

});
