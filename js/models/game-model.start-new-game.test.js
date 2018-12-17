import {assert} from 'chai';
import GameModel from "./game-model";
import 'jsdom-global/register';

describe(`Модель игры`, () => {
  const gameModel = new GameModel();

  it(`метод startNewGame() сбрасывает состояние игры на начало`, () => {
    const testState = {
      currentLevel: 0,
      livesLeft: 3,
      answers: [],
      timeLeft: 300,
      bonusTimeLeft: 30,
      score: 0
    };

    gameModel.startNewGame(); // Первая инициализация

    gameModel._state.currentLevel++;
    gameModel._state.livesLeft--;
    gameModel._state.answers.push(true);
    gameModel._state.timeLeft--;
    gameModel._state.bonusTimeLeft--;
    gameModel._state.score++;

    gameModel.startNewGame(); // Рестарт

    assert.deepEqual(gameModel.state, testState);
  });
});
