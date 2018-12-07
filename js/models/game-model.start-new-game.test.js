import {assert} from 'chai';
import GameModel from "./game-model";

describe(`Модель игры`, () => {
  const gameModel = new GameModel();

  it(`метод startNewGame() сбрасывает состояние игры на начало`, () => {
    const testState = {
      currentLevel: 0,
      livesLeft: 4,
      answers: [],
      timeLeft: 300,
      bonusTimeLeft: 30,
      score: 0
    };

    gameModel._state.currentLevel++;
    gameModel._state.livesLeft--;
    gameModel._state.answers.push(true);
    gameModel._state.timeLeft--;
    gameModel._state.bonusTimeLeft--;
    gameModel._state.score++;

    gameModel.startNewGame();

    assert.deepEqual(gameModel.state, testState);
  });
});
