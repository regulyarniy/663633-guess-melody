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

  it(`setAnswer(answer) переключил уровень после ответа`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    gameModel._state.currentLevel = 0;
    gameModel.setAnswer([true]);
    assert.strictEqual(gameModel.state.currentLevel, 1);
  });

  it(`setAnswer(answer) пересчитал жизни`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    gameModel._state.currentLevel = 0;
    gameModel._state.livesLeft = 1;
    gameModel.setAnswer([]);
    assert.strictEqual(gameModel.state.livesLeft, 0);
  });

  it(`setAnswer(answer) сохранил ответ`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    const testedAnswerLength = gameModel.state.answers.length;
    gameModel.setAnswer([]);
    assert.isAbove(gameModel.state.answers.length, testedAnswerLength);
  });

});
