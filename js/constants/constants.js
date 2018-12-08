// Начальное состояние игры
export const NEW_GAME = Object.freeze({
  currentLevel: 0,
  livesLeft: 4,
  answers: [],
  timeLeft: 300,
  bonusTimeLeft: 30,
  score: 0
});

// Данные для ответов
export const ANSWERS_DATA = Object.freeze([
  {
    genre: `Jazz`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    answers: [
      {id: 1, artist: `Kevin MacLeod`, pictureURL: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Audionautix`, pictureURL: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`, valid: true}
    ]
  },
  {
    genre: `Rock`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: false},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: false},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`, valid: true},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`, valid: true}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  },
  {
    genre: `R&B`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  },
  {
    genre: `R&B`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  },
  {
    genre: `R&B`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  }
]);

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
