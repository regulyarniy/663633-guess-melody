const BONUS_TIME = 30; //  Время для бонуса
const BONUS_SUCCESS = 2; // Мультипликатор для бонуса
const BONUS_FAIL = 1; // Мультипликатор без бонуса
const MIN_LIVES = 0; // Минимум жизней
const FAIL_RESULT = -1; // Возвращаемое значение при проигрыше
const SCORE_SUCCESS = 1; // Баллы за успешныйответ
const SCORE_FAIL = -2; // Баллы за ошибку
export const MAX_QUESTIONS = 10; // Вопросов на игру
export const RESULT_FAIL_TRIES = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`; // Ответ при проигрыше по попыткам
export const RESULT_FAIL_TIME = `Время вышло! Вы не успели отгадать все мелодии`; // Ответ при проигрыше по времени
const MIN_TIME_LEFT = 0; // Минимальное количество секунд до проигрыша


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
  // Вывод результата игры
  getResult(statistics, playerResult) {
    const POSITION_INCREMENT = 1; // Инкремент для поправки места игрока с учетом нумерации индексов в массиве
    if (playerResult.livesLeft <= MIN_LIVES) {
      return RESULT_FAIL_TRIES;
    }
    if (playerResult.timeLeft <= MIN_TIME_LEFT) {
      return RESULT_FAIL_TIME;
    }
    let newStatistics = statistics.slice();
    newStatistics.push(playerResult.score);
    newStatistics.sort((a, b) => b - a);
    const position = newStatistics.indexOf(playerResult.score) + POSITION_INCREMENT;
    const playersCount = newStatistics.length;
    const playerRating = Math.floor(((playersCount - position) / playersCount) * 100);
    return `Вы заняли ${position} место из ${playersCount} игроков. Это лучше, чем у ${playerRating}% игроков`;
  }
};
