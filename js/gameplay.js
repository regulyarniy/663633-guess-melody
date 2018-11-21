const BONUS_TIME = 30; //  Время для бонуса
const BONUS_SUCCESS = 2; // Мультипликатор для бонуса
const BONUS_FAIL = 1; // Мультипликатор без бонуса
const MIN_LIVES = 0; // Минимум жизней
const FAIL_RESULT = -1; // Возвращаемое значение при проигрыше
const SCORE_SUCCESS = 1; // Баллы за успешныйответ
const SCORE_FAIL = -2; // Баллы за ошибку

export const MAX_QUESTIONS = 10;

export default {
  // Подсчёт набранных баллов игрока
  countScore(answers = [], livesLeft = MIN_LIVES) {
    const REDUCER_INITIAL_VALUE = 0;

    if (answers.length < MAX_QUESTIONS || livesLeft <= MIN_LIVES) {
      return FAIL_RESULT;
    }
    const reducer = (accumulator, currentValue) => {
      const RADIX = 10;

      // Считаем баллы за ответ
      let increment = parseInt((currentValue.success) ? SCORE_SUCCESS : SCORE_FAIL, RADIX);
      //  Умножаем если был быстрый успешный ответ
      increment *= (currentValue.time <= BONUS_TIME && increment === SCORE_SUCCESS) ? BONUS_SUCCESS : BONUS_FAIL;
      return accumulator + increment;
    };
    return answers.reduce(reducer, REDUCER_INITIAL_VALUE);
  },
};
