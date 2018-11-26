import {assert} from 'chai';
import gameplay from './gameplay';

describe(`Функция управления жизнями игрока`, () => {
  let answer = {};
  it(`количество жизней не изменилось, если игрок ответил правильно`, () => {
    answer = {success: true, time: 20};
    assert.equal(gameplay.countLives(answer, 3), 3);
  });
  it(`жизнь отнялась, если игрок ответил неправильно`, () => {
    answer = {success: false, time: 20};
    assert.equal(gameplay.countLives(answer, 1), 0);
  });
});
