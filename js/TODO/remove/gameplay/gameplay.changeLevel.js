export const LEVEL_MAX = 9; // Максимальный уровень
const LEVEL_INCREMENT = 1; // Инкремент уровня
const LEVEL_ENDGAME = -1; // Уровень конца игры

/**
 * Считает номер следующего уровня
 * @param {Number} currentLevel Номер текущего уровня
 * @param {Number} livesLeft  Количество оставшихся попыток
 * @return {Number} Возвращает номер следующего существующего уровня, или -1 если текущий уровень последний или кончились жизни
 */
export default (currentLevel, livesLeft) => {
  if (livesLeft === 0 || currentLevel >= LEVEL_MAX) {
    return LEVEL_ENDGAME;
  } else {
    return currentLevel + LEVEL_INCREMENT;
  }
};
