// Начальное состояние игры
export const NEW_GAME = Object.freeze({
  currentLevel: 0,
  livesLeft: 4,
  answers: [],
  timeLeft: 300,
  bonusTimeLeft: 30,
  score: 0
});

// Настройки игры
const hash = window.location.hash.replace(`#`, ``);
export const Settings = Object.freeze({
  DEBUG: hash.toLowerCase() === `debug`, // Режим отладки (вход по адресу /#debug)
  LEVEL_MAX: 9, // Максимальный уровень
  LEVEL_INCREMENT: 1, // Инкремент уровня
  LEVEL_ENDGAME: -1, // Уровень конца игры
  LIVES_DECREMENT: 1, // Декремент количества попыток при неправильном ответе
  SUCCESS_ANSWER: true, // Успешный ответ
  FAILED_ANSWER: false // Неуспешный  ответ
});

// Константы для функции вычисления времени таймера GameModel.getTimeLeft
export const Timer = Object.freeze({
  DATE_MS_TO_SEC_MULTIPLY: 1000, // Множитель миллисекунд в секунды
  TIMER_END: 0, // Конец отчёта в секундах
  TIMER_END_RESULT: -1, // Вывод функции при истекшем таймере
});

// Варианты экранов проигрыша
export const FailCases = {
  BY_TIME: true,
  BY_TRIES: false
};

// Настройки подсчёта очков
export const ScoreSettings = {
  BONUS_TIME: 30, //  Время для бонуса
  BONUS_SUCCESS: 2, // Мультипликатор для бонуса
  BONUS_FAIL: 1, // Мультипликатор без бонуса
  FAIL_RESULT: -1, // Возвращаемое значение при проигрыше
  SCORE_SUCCESS: 1, // Баллы за успешный ответ
  SCORE_FAIL: -2, // Баллы за ошибку
  MIN_LIVES: 0, // Минимум жизней
  MAX_QUESTIONS: 10, // Вопросов на игру
  REDUCER_INITIAL_VALUE: 0, // Начальное значение для аккумулятора
  SCORE_FAIL_FOR_BONUS_SCORE: 0, // Баллы для ошибки в подсчете бонусов
};

// Настройки вывода строки рейтинга
export const RatingSettings = {
  MIN_LIVES: 0, // Минимум жизней
  RESULT_FAIL_TRIES: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`, // Ответ при проигрыше по попыткам
  RESULT_FAIL_TIME: `Время вышло! Вы не успели отгадать все мелодии`, // Ответ при проигрыше по времени
  MIN_TIME_LEFT: 0, // Минимальное количество секунд до проигрыша
  POSITION_INCREMENT: 1 // Инкремент для поправки места игрока с учетом нумерации индексов в массиве
};

// Настройки анимации круглого таймера
export const RoundTimer = {
  RADIX: 10, // Основание системы счисления
  CIRCLE_FORMULA: 2 * Math.PI// Радиус круга
};
