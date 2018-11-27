const DATE_MS_TO_SEC_MULTIPLY = 1000; // Множитель миллисекунд в секунды
const TIMER_END = 0; // Конец отчёта в секундах
const TIMER_END_RESULT = -1; // Вывод функции при истекшем таймере

/**
 * Вычисляет время до окончания таймера
 * @param {Date} startDate Начало отсчёта(инстанс Data)
 * @param {Number} timer Таймер(секунды)
 * @param {Date} checkDate Момент проверки(инстанс Data)
 * @return {number} Возвращает количество секунд до истечения таймера или -1, если таймер истек
 */
export default (startDate, timer, checkDate = new Date()) => {
  const checkDateInSeconds = checkDate.getTime() / DATE_MS_TO_SEC_MULTIPLY;
  const startDateInSeconds = startDate.getTime() / DATE_MS_TO_SEC_MULTIPLY;
  const timeLeft = checkDateInSeconds - startDateInSeconds + timer;
  return (timeLeft >= TIMER_END) ? timeLeft : TIMER_END_RESULT;
};
