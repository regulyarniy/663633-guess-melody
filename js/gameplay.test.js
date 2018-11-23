import {assert} from 'chai';
import gameplay from './gameplay';
import {MAX_QUESTIONS, RESULT_FAIL_TRIES, RESULT_FAIL_TIME} from './gameplay';

let answers = [];
let statistics = [];
let playerResult = {};
let answer = {};

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

describe(`Функция вывода результата игры`, () => {
  it(`вернула результат при проигрыше по попыткам`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {
      score: 4,
      livesLeft: 0,
      timeLeft: 45
    };
    assert.equal(gameplay.getResult(statistics, playerResult), RESULT_FAIL_TRIES);
  });
  it(`вернула результат при проигрыше по времени`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {
      score: 4,
      livesLeft: 1,
      timeLeft: 0
    };
    assert.equal(gameplay.getResult(statistics, playerResult), RESULT_FAIL_TIME);
  });
  it(`вернула результат при выигрыше(1 место)`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {
      score: 6,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`);
    statistics = [1, 2, 3, 4];
    playerResult = {
      score: 6,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`);
    statistics = [1];
    playerResult = {
      score: 6,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 1 место из 2 игроков. Это лучше, чем у 50% игроков`);
  });
  it(`вернула результат при выигрыше(последнее место)`, () => {
    statistics = [1, 2, 3, 4, 5];
    playerResult = {
      score: 0,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`);
    statistics = [1, 2, 3, 4];
    playerResult = {
      score: 0,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`);
    statistics = [1];
    playerResult = {
      score: 0,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 2 место из 2 игроков. Это лучше, чем у 0% игроков`);
    statistics = [4, 5, 6];
    playerResult = {
      score: 3,
      livesLeft: 3,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 4 место из 4 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`вернула регультат при выигрыше(место в середине)`, () => {
    statistics = [1, 2, 4, 5];
    playerResult = {
      score: 3,
      livesLeft: 1,
      timeLeft: 10
    };
    assert.equal(gameplay.getResult(statistics, playerResult), `Вы заняли 3 место из 5 игроков. Это лучше, чем у 40% игроков`);
  });
});

describe(`Функция управления жизнями игрока`, () => {
  it(`вернула результат, если игрок ответил правильно`, () => {
    answer = {success: true, time: 20};
    assert.equal(gameplay.countLives(answer, 3), 3);
    assert.equal(gameplay.countLives(answer, 2), 2);
    assert.equal(gameplay.countLives(answer, 1), 1);
  });
  it(`вернула результат, если игрок ответил неправильно`, () => {
    answer = {success: false, time: 20};
    assert.equal(gameplay.countLives(answer, 3), 2);
    assert.equal(gameplay.countLives(answer, 2), 1);
    assert.equal(gameplay.countLives(answer, 1), 0);
  });
});

describe(`Функция переключения уровней`, () => {
  it(`вернула номер следующего уровня, если текущий уровень меньше максимального`, () => {
    assert.equal(gameplay.changeLevel(1, 3), 2);
    assert.equal(gameplay.changeLevel(8, 3), 9);
    assert.equal(gameplay.changeLevel(2, 3), 3);
  });
  it(`вернула -1, если текущий уровень максимальный`, () => {
    assert.equal(gameplay.changeLevel(10, 3), -1);
  });
  it(`вернула -1, если закончились жизни`, () => {
    assert.equal(gameplay.changeLevel(9, 0), -1);
    assert.equal(gameplay.changeLevel(10, 0), -1);
  });
});
