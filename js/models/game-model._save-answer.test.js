import {assert} from 'chai';
import GameModel from "./game-model";
import 'jsdom-global/register';

describe(`Модель игры`, () => {

  /** Тесты производятся с учетом того, что вопросы 0 и 1 имеют следующую структуру
   * {
    genre: `Jazz`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: false}
    ]
  },
   {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    answers: [
      {id: 1, artist: `Kevin MacLeod`, pictureURL: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Audionautix`, pictureURL: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`, valid: true}
    ]
  }
   */

  const questionsMock = [{
    type: `genre`,
    question: `Выберите попсу`,
    genre: `pop`,
    answers: [
      {
        src: `https://freemusicarchive.org/music/listen/826311a7d761ae8c4afb89650145c1646729ecf0`,
        genre: `pop`
      },
      {
        src: `https://freemusicarchive.org/music/listen/af22a1f56cfff9ed8aa7759f7c4e466d6aeb1eea`,
        genre: `pop`
      },
      {
        src: `https://freemusicarchive.org/music/listen/6eb489b2c33ba12d316f321629cc7a4cc6c9e366`,
        genre: `electronic`
      },
      {
        src: `https://freemusicarchive.org/music/listen/bfe59487a49edc18068c7f118a8b346639791805`,
        genre: `rock`
      }
    ]
  },
  {
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

  it(`_saveAnswer(answer) добавляет верный ответ игры на жанр в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    gameModel._state.currentLevel = 0;
    const answer = [true, true, false, false];
    const testAnswers = [{success: true, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });

  it(`_saveAnswer(answer) добавляет неверный ответ игры на жанр в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    gameModel._state.currentLevel = 0;
    const answer = [true, true, true, false];
    const testAnswers = [{success: false, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });

  it(`_saveAnswer(answer) добавляет верный ответ игры на артиста в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    gameModel._state.currentLevel = 1;
    const answer = true;
    const testAnswers = [{success: true, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });

  it(`_saveAnswer(answer) добавляет неверный ответ игры на артиста в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel.startNewGame();
    gameModel._questions = questionsMock;
    gameModel._state.currentLevel = 1;
    const answer = false;
    const testAnswers = [{success: false, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });
});
