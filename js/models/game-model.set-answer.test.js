import {assert} from 'chai';
import GameModel from "./game-model";
import 'jsdom-global/register';

describe(`Модель игры`, () => {

  it(`setAnswer(answer) переключил уровень после ответа`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 0;
    gameModel.setAnswer([true]);
    assert.strictEqual(gameModel.state.currentLevel, 1);
  });

  it(`setAnswer(answer) пересчитал жизни`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 0;
    gameModel._state.livesLeft = 1;
    gameModel.setAnswer([]);
    assert.strictEqual(gameModel.state.livesLeft, 0);
  });

  it(`setAnswer(answer) сохранил ответ`, () => {
    const gameModel = new GameModel();
    const testedAnswerLength = gameModel.state.answers.length;
    gameModel.setAnswer([]);
    assert.isAbove(gameModel.state.answers.length, testedAnswerLength);
  });

});
