// Время для быстрого ответа
const BONUS_TIME = 30;
export const MAX_QUESTIONS = 10;

export default {
  // Подсчёт набранных баллов игрока
  countScore(answers = [], questionsLeft = MAX_QUESTIONS) {
    if (!Array.isArray(answers)) {
      throw new Error(`answers must be an array`);
    }
    if (typeof (questionsLeft) !== `number`) {
      throw new Error(`questionsLeft must be a number`);
    }
    if (answers.length !== MAX_QUESTIONS) {
      throw new Error(`answers have incorrect length`);
    }
    let score = -1;
    if (questionsLeft !== 0) {
      return score;
    }
    const reducer = (accumulator, currentValue) => {
      // Считаем баллы за ответ
      let increment = parseInt((currentValue.success) ? 1 : -2, 10);
      //  Умножаем если был быстрый успешный ответ
      increment *= (currentValue.time <= BONUS_TIME && increment > 0) ? 2 : 1;
      return accumulator + increment;
    };
    score = answers.reduce(reducer, 0);
    return score;
  },
};
