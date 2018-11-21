import {assert} from 'chai';
import gameplay from './gameplay';
import {MAX_QUESTIONS} from './gameplay';

let answers = [];
let statistics = [];
let playerResult = {};

describe(`Функция подсчёта очков`, () => {
  it(`вернула результат, если игрок ответил меньше, чем на ${MAX_QUESTIONS} вопросов`, () => {
    answers = [
      {
        success: true,
        time: 10
      },
      {
        success: true,
        time: 20
      },
      {
        success: true,
        time: 30
      },
      {
        success: true,
        time: 40
      }
    ];
    assert.equal(gameplay.countScore(answers, 3), -1);
    answers = [
      {
        success: true,
        time: 10
      },
      {
        success: false,
        time: 20
      },
      {
        success: true,
        time: 30
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      }
    ];
    assert.equal(gameplay.countScore(answers, 2), -1);
    answers = [
      {
        success: true,
        time: 10
      },
      {
        success: false,
        time: 20
      },
      {
        success: false,
        time: 30
      },
      {
        success: true,
        time: 40
      }
    ];
    assert.equal(gameplay.countScore(answers, 1), -1);
  });
  it(`вернула результат, если игрок ответил на все вопросы правильно и не быстро`, () => {
    answers = [
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      },
      {
        success: true,
        time: 40
      }
    ];
    assert.equal(gameplay.countScore(answers, 3), 10);
  });
  it(`вернула результат, если игрок ответил на все вопросы правильно и быстро`, () => {
    answers = [
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 30
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      }
    ];
    assert.equal(gameplay.countScore(answers, 3), 20);
  });
  it(`вернула результат, если игрок ответил на все вопросы с разным успехом в разное время`, () => {
    answers = [
      {
        success: false,
        time: 31
      },
      {
        success: false,
        time: 31
      },
      {
        success: false,
        time: 25
      },
      {
        success: true,
        time: 32
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      }
    ];
    assert.equal(gameplay.countScore(answers, 0), -1);
    answers = [
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: false,
        time: 31
      }
    ];
    assert.equal(gameplay.countScore(answers, 2), 7);
    answers = [
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: false,
        time: 31
      },
      {
        success: false,
        time: 31
      }
    ];
    assert.equal(gameplay.countScore(answers, 1), 4);
    answers = [
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 25
      },
      {
        success: false,
        time: 31
      },
      {
        success: false,
        time: 31
      }
    ];
    assert.equal(gameplay.countScore(answers, 1), 6);
  });
});

describe(`Функция вывода результата`, () => {
  it(`вернула результат при проигрыше по попыткам`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {
      score: 4,
      livesLeft: 2,
      timeLeft: 45
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});
