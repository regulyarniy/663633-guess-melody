import {assert} from 'chai';
import gameplay, {RESULT_FAIL_TRIES, RESULT_FAIL_TIME} from './gameplay';

describe(`Функция вывода результата игры`, () => {
  let statistics = [];
  let playerResult = {};
  it(`вернула верную строку при проигрыше по попыткам`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {score: 4, livesLeft: 0, timeLeft: 45};
    assert.equal(gameplay.getResult(statistics, playerResult), RESULT_FAIL_TRIES);
  });
  it(`вернула верную строку при проигрыше по времени`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {score: 4, livesLeft: 1, timeLeft: 0};
    assert.equal(gameplay.getResult(statistics, playerResult), RESULT_FAIL_TIME);
  });
  it(`вернула верную строку при выигрыше(1 место) из 6 игроков`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {score: 6, livesLeft: 1, timeLeft: 10};
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`);
  });
  it(`вернула верную строку при выигрыше(1 место) из 2 игроков`, () => {
    statistics = [1];
    playerResult = {score: 6, livesLeft: 1, timeLeft: 10};
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 1 место из 2 игроков. Это лучше, чем у 50% игроков`);
  });
  it(`вернула верную строку при выигрыше(последнее место)`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {score: 0, livesLeft: 1, timeLeft: 10};
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`вернула верную строку при выигрыше(место в середине)`, () => {
    statistics = [1, 2, 4, 5];
    playerResult = {score: 3, livesLeft: 1, timeLeft: 10};
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 3 место из 5 игроков. Это лучше, чем у 40% игроков`);
  });
});
