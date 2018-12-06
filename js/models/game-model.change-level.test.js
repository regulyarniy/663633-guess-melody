import {assert} from 'chai';
import GameModel from "./game-model";
import {Settings} from '../constants/constants';

describe(`Модель игры`, () => {

  it(`changeLevel() сменил уровень на 1, если текущий уровень(0) меньше максимального`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 0;
    gameModel.changeLevel();
    assert.strictEqual(gameModel.state.currentLevel, 1);
  });

  it(`changeLevel() сменил уровень на -1, если текущий уровень максимальный`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = Settings.LEVEL_MAX;
    gameModel.changeLevel();
    assert.strictEqual(gameModel.state.currentLevel, -1);
  });

  it(`changeLevel() сменил уровень на -1, если закончились жизни`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 2;
    gameModel._state.livesLeft = 0;
    gameModel.changeLevel();
    assert.strictEqual(gameModel.state.currentLevel, -1);
  });

});
