import {assert} from 'chai';
import countBonusScore, {MAX_QUESTIONS} from './gameplay.countBonusScore';

describe(`Функция подсчёта бонусных очков`, () => {
  let answers = [];
  it(`вернула -1, если игрок ответил меньше, чем на ${MAX_QUESTIONS} вопросов`, () => {
    answers = [{success: true, time: 10}];
    assert.equal(countBonusScore(answers, 3), -1);
  });
  it(`вернула -1, если осталось 0 попыток`, () => {
    answers = Array(10).fill({success: true, time: 10});
    assert.equal(countBonusScore(answers, 0), -1);
  });
  it(`вернула 0, если игрок ответил на все вопросы правильно и не быстро`, () => {
    answers = Array(10).fill({success: true, time: 45});
    assert.equal(countBonusScore(answers, 3), 0);
  });
  it(`вернула 20, если игрок ответил на все вопросы правильно и быстро`, () => {
    answers = Array(10).fill({success: true, time: 25});
    assert.equal(countBonusScore(answers, 3), 20);
  });
  it(`вернула 6, если игрок ответил на все вопросы с разным успехом в разное время`, () => {
    answers = Array(10)
      .fill({success: true, time: 25}, 0, 3)
      .fill({success: true, time: 45}, 4, 7)
      .fill({success: false, time: 25}, 8, 9);
    assert.equal(countBonusScore(answers, 1), 6);
  });
});


