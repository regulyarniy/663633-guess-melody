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
  FAILED_ANSWER: false, // Неуспешный  ответ
  POSITIVE_ANSWER: true, // Положительный ответ
  NEGATIVE_ANSWER: false, // Отрицательный ответ(при выборе нескольких)
});

// Константы для функции вычисления времени таймера GameModel.getTimeLeft
export const Timer = Object.freeze({
  DATE_MS_TO_SEC_MULTIPLY: 1000, // Множитель миллисекунд в секунды
  END: 0, // Конец отчёта в секундах
  END_RESULT: -1, // Вывод функции при истекшем таймере
  EXPIRE: 30, // Значение таймера для индикации истечения времени игры
});

// Варианты экранов проигрыша
export const FailCases = {
  BY_TIME: true,
  BY_TRIES: false
};

// Настройки подсчёта очков
export const ScoreSettings = {
  BONUS_TIME_END: 0, //  Время окончания бонусного времени
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

// URL для backend
export const Endpoint = {
  QUESTIONS: `https://es.dump.academy/guess-melody/questions`,
  STATS: `https://es.dump.academy/guess-melody/stats/663633`
};

// Привязки к DOM
export const MountPoint = {
  ROOT: `.app`,
  SCREEN: `.main`,
};

// Максимальное кол-во ошибок, которые может допустить игрок
export const MAX_MISTAKES = NEW_GAME.livesLeft - 1;
