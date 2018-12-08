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

  it(`_saveAnswer(answer) добавляет верный ответ игры на жанр в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 0;
    const answer = [true, true, false, false];
    const testAnswers = [{success: true, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });

  it(`_saveAnswer(answer) добавляет неверный ответ игры на жанр в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 0;
    const answer = [true, true, true, false];
    const testAnswers = [{success: false, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });

  it(`_saveAnswer(answer) добавляет верный ответ игры на артиста в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 1;
    const answer = 3;
    const testAnswers = [{success: true, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });

  it(`_saveAnswer(answer) добавляет неверный ответ игры на артиста в массив с ответами пользователя`, () => {
    const gameModel = new GameModel();
    gameModel._state.currentLevel = 1;
    const answer = 2;
    const testAnswers = [{success: false, time: 30}];
    gameModel._saveAnswer(answer);
    assert.deepEqual(gameModel.state.answers, testAnswers);
  });
});
