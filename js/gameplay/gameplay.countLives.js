const LIVES_DECREMENT = 1; // Декремент жизней при неверном ответе
/**
 * Считает жизни игрока в зависимости от ответа
 * @param {Object} answer Обьект с ответом игрока
 * @param {Number} livesLeft Текущее количество жизней
 * @return {Number} Возвращает количество жизней
 */
export default (answer, livesLeft) => {
  return answer.success ? livesLeft : livesLeft - LIVES_DECREMENT;
};
