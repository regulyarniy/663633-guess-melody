import {assert} from 'chai';
import gameplay, {LEVEL_MAX} from './gameplay';

describe(`Функция переключения уровней`, () => {
  let currentLevel;
  let livesLeft;
  it(`вернула номер следующего уровня, если текущий уровень(1) меньше максимального`, () => {
    currentLevel = 1;
    livesLeft = 3;
    assert.equal(gameplay.changeLevel(currentLevel, livesLeft), 2);
  });
  it(`вернула номер следующего уровня, если текущий уровень(8) меньше максимального`, () => {
    currentLevel = LEVEL_MAX - 1;
    livesLeft = 3;
    assert.equal(gameplay.changeLevel(currentLevel, livesLeft), LEVEL_MAX);
  });
  it(`вернула -1, если текущий уровень максимальный`, () => {
    livesLeft = 3;
    assert.equal(gameplay.changeLevel(LEVEL_MAX, livesLeft), -1);
  });
  it(`вернула -1, если закончились жизни`, () => {
    currentLevel = 9;
    livesLeft = 0;
    assert.equal(gameplay.changeLevel(currentLevel, livesLeft), -1);
  });
});
