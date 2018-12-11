import {assert} from 'chai';
import {convertMistakesToPluralString} from "./utils";

describe(`Функция конвертации ошибок в строку во множественном числе`, () => {

  it(`возвращает верную строку для 0 ошибок`, () => {
    assert.strictEqual(convertMistakesToPluralString(0), `0 ошибок`);
  });

  it(`возвращает верную строку для 1 ошибки`, () => {
    assert.strictEqual(convertMistakesToPluralString(1), `1 ошибку`);
  });

  it(`возвращает верную строку для 2 ошибок`, () => {
    assert.strictEqual(convertMistakesToPluralString(2), `2 ошибки`);
  });

  it(`возвращает верную строку для 3 ошибок`, () => {
    assert.strictEqual(convertMistakesToPluralString(3), `3 ошибки`);
  });
});
