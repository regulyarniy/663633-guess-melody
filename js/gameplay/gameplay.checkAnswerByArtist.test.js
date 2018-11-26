import {assert} from 'chai';
import checkAnswerByArtist from './gameplay.checkAnswerByArtist';

describe(`Функция проверки ответа для игры по артисту`, () => {
  let questions = [
    {id: 1, artist: `Kevin MacLeod`, pictureURL: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`, valid: false},
    {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
    {id: 3, artist: `Audionautix`, pictureURL: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`, valid: true}
  ];
  let answer;
  it(`возвращает true при правильном ответе`, () => {
    answer = 3;
    assert.equal(checkAnswerByArtist(questions, answer), true);
  });
  it(`возвращает true при правильном ответе, записанном строкой`, () => {
    answer = `3`;
    assert.equal(checkAnswerByArtist(questions, answer), true);
  });
  it(`возвращает false при неправильном ответе`, () => {
    answer = 1;
    assert.equal(checkAnswerByArtist(questions, answer), false);
  });
});
