const MIN_LIVES = 0; // Минимум жизней
export const RESULT_FAIL_TRIES = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`; // Ответ при проигрыше по попыткам
export const RESULT_FAIL_TIME = `Время вышло! Вы не успели отгадать все мелодии`; // Ответ при проигрыше по времени
const MIN_TIME_LEFT = 0; // Минимальное количество секунд до проигрыша
/**
 * Вычисляет сообщение о результате игрока
 * @param {Array} statistics Массив очков других игроков
 * @param {Object} playerResult Обьект с состоянием игры
 * @return {string} Возвращает строку с результатом игры
 */
export default (statistics, playerResult) => {
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
};
