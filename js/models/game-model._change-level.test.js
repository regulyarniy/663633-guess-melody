import {assert} from 'chai';
import GameModel from "./game-model";
import 'jsdom-global/register';
import {Settings} from '../constants/constants';

describe(`Модель игры`, () => {

  it(`_changeLevel() сменил уровень на 1, если текущий уровень(0) меньше максимального`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._state.currentLevel = 0;
    gameModel._changeLevel();
    assert.strictEqual(gameModel.state.currentLevel, 1);
  });

  it(`_changeLevel() сменил уровень на -1, если текущий уровень максимальный`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._state.currentLevel = Settings.LEVEL_MAX;
    gameModel._changeLevel();
    assert.strictEqual(gameModel.state.currentLevel, -1);
  });

  it(`_changeLevel() сменил уровень на -1, если закончились жизни`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._state.currentLevel = 2;
    gameModel._state.livesLeft = 0;
    gameModel._changeLevel();
    assert.strictEqual(gameModel.state.currentLevel, -1);
  });

});
