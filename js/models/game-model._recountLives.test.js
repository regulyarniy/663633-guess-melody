import {assert} from 'chai';
import GameModel from "./game-model";

describe(`Модель игры`, () => {

  it(`_recountLives() убавляет жизнь, если последний ответ был неправильный`, () => {
    const gameModel = new GameModel();
    gameModel._state.answers = [{success: false, time: 30}];
    gameModel._state.livesLeft = 4;
    gameModel._recountLives();
    assert.strictEqual(gameModel.state.livesLeft, 3);
  });

  it(`_recountLives() не убавляет жизнь, если последний ответ был правильный`, () => {
    const gameModel = new GameModel();
    gameModel._state.answers = [{success: true, time: 30}];
    gameModel._state.livesLeft = 4;
    gameModel._recountLives();
    assert.strictEqual(gameModel.state.livesLeft, 4);
  });

});
