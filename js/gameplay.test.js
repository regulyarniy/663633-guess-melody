import {assert} from 'chai';
import gameplay from './gameplay';
import {MAX_QUESTIONS} from './gameplay';
let answers = [];

describe(`Функция подсчёта очков`, () => {
  it(`вернула результат(-1), если игрок ответил меньше, чем на ${MAX_QUESTIONS} вопросов`, () => {
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
    assert.equal(gameplay.countScore(answers, MAX_QUESTIONS), -1);
    assert.equal(gameplay.countScore(answers, 5), -1);
    assert.equal(gameplay.countScore(answers, 1), -1);
  });
  it(`вернула результат(-1), если не передан аргумент questionsLeft`, () => {
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
    assert.equal(gameplay.countScore(answers), -1);
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
    assert.equal(gameplay.countScore(answers, 0), 10);
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
    assert.equal(gameplay.countScore(answers, 0), 20);
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
    assert.equal(gameplay.countScore(answers, 0), 7);
    answers = [
      {
        success: true,
        time: 31
      },
      {
        success: true,
        time: 22
      },
      {
        success: true,
        time: 25
      },
      {
        success: false,
        time: 33
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 22
      },
      {
        success: true,
        time: 15
      },
      {
        success: true,
        time: 25
      },
      {
        success: true,
        time: 32
      },
      {
        success: false,
        time: 86
      }
    ];
    assert.equal(gameplay.countScore(answers, 0), 10);
  });
  it(`вернула ошибку, если в answers передано некорректное значение`, () => {
    assert.throws(() => {
      gameplay.countScore(`str`, 0);
    }, /answers must be an array/);
    assert.throws(() => {
      gameplay.countScore(11, 0);
    }, /answers must be an array/);
    assert.throws(() => {
      gameplay.countScore(null, 0);
    }, /answers must be an array/);
    assert.throws(() => {
      gameplay.countScore(true, 0);
    }, /answers must be an array/);
    assert.throws(() => {
      gameplay.countScore({}, 0);
    }, /answers must be an array/);
  });
  it(`вернула ошибку, если в answers содержится менее ${MAX_QUESTIONS} ответов`, () => {
    assert.throws(() => {
      gameplay.countScore([{}, {}], 0);
    }, /answers have incorrect length/);
  });
  it(`вернула ошибку, если в questionsLeft передано некорректное значение`, () => {
    assert.throws(() => {
      gameplay.countScore([], `str`);
    }, /questionsLeft must be a number/);
    assert.throws(() => {
      gameplay.countScore([], {});
    }, /questionsLeft must be a number/);
    assert.throws(() => {
      gameplay.countScore([], true);
    }, /questionsLeft must be a number/);
    assert.throws(() => {
      gameplay.countScore([], null);
    }, /questionsLeft must be a number/);
  });
});
