import {assert} from 'chai';
import GameModel from "./game-model";
import 'jsdom-global/register';

describe(`Модель игры`, () => {
  const gameModel = new GameModel();

  it(`Класс после создания имеет начальное состояние игры`, () => {
    const testState = {
      currentLevel: 0,
      livesLeft: 4,
      answers: [],
      timeLeft: 300,
      bonusTimeLeft: 30,
      score: 0
    };

    assert.deepEqual(gameModel.state, testState);
  });
});
