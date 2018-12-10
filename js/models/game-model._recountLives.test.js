import {assert} from 'chai';
import GameModel from "./game-model";
import 'jsdom-global/register';

describe(`Модель игры`, () => {

  const questionsMock = [{
    type: `artist`,
    question: `Кто исполняет эту песню?`,
    src: `https://freemusicarchive.org/music/listen/8f00fff1184fd2564234f5e665fe14f10baec290`,
    answers: [
      {
        image: {
          url: `https://freemusicarchive.org/file/images/artists/Black_Ant_-_20100815203310658.png?width=300&height=300`,
          width: 300,
          height: 300
        },
        title: `Black Ant`,
        isCorrect: true
      },
      {
        image: {
          url: `https://freemusicarchive.org/file/images/artists/Waylon_Thornton_-_2012061793125465.jpg?width=300&height=300`,
          width: 300,
          height: 300
        },
        title: `Waylon Thornton`,
        isCorrect: false
      },
      {
        image: {
          url: `https://freemusicarchive.org/file/images/artists/Michael_Chapman__The_Woodpiles_-_2012081323009192.jpg?width=290&height=290`,
          width: 300,
          height: 300
        },
        title: `Michael Chapman & The Woodpiles`,
        isCorrect: false
      }
    ]
  }];

  it(`_recountLives() убавляет жизнь, если последний ответ был неправильный`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._state.answers = [{success: false, time: 30}];
    gameModel._state.livesLeft = 4;
    gameModel._questions = questionsMock;
    gameModel._recountLives();
    assert.strictEqual(gameModel.state.livesLeft, 3);
  });

  it(`_recountLives() не убавляет жизнь, если последний ответ был правильный`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._state.answers = [{success: true, time: 30}];
    gameModel._state.livesLeft = 4;
    gameModel._questions = questionsMock;
    gameModel._recountLives();
    assert.strictEqual(gameModel.state.livesLeft, 4);
  });

});
