import {assert} from 'chai';
import gameplay from './gameplay';

describe(`Функция получения нужного типа игры в зависимости от вопроса`, () => {
  let answer = {};
  it(`возвращает игру по жанру, если содержится свойство genre`, () => {
    answer = {genre: ``, answers: []};
    assert.equal(gameplay.getGameMode(answer), `GameGenre`);
  });
  it(`возвращает игру по артисту, если содержится свойство audioURL`, () => {
    answer = {audioURL: ``, answers: []};
    assert.equal(gameplay.getGameMode(answer), `GameArtist`);
  });
  it(`возвращает -1, если не содержится ни одного нужного свойства в обьекте`, () => {
    answer = {};
    assert.equal(gameplay.getGameMode(answer), -1);
  });
  it(`возвращает -1, если передан не обьект`, () => {
    answer = undefined;
    assert.equal(gameplay.getGameMode(answer), -1);
  });
});
