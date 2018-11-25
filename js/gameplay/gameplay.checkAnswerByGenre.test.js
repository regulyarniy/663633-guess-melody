import {assert} from 'chai';
import gameplay from './gameplay';

describe(`Функция проверки ответа для игры по жанрам`, () => {
  let questions = [
    {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
    {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
    {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
    {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: false}
  ];
  let answers = [];
  it(`возвращает true при правильном ответе`, () => {
    answers = [true, true, false, false];
    assert.equal(gameplay.checkAnswerByGenre(questions, answers), true);
  });
  it(`возвращает false при неправильном ответе`, () => {
    answers = [true, true, true, false];
    assert.equal(gameplay.checkAnswerByGenre(questions, answers), false);
  });
});
