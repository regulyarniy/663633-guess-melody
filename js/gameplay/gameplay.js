// TODO use lowercase modules names
import changeLevel from './gameplay.changeLevel';
import checkAnswerByArtist from './gameplay.checkAnswerByArtist';
import checkAnswerByGenre from './gameplay.checkAnswerByGenre';
import countLives from './gameplay.countLives';
import countScore from './gameplay.countScore';
import getGameMode from './gameplay.getGameMode';
import getResult from './gameplay.getResult';
import getTimeLeft from './gameplay.getTimeLeft';
import countBonusScore from './gameplay.countBonusScore';

export default {
  // Подсчёт набранных баллов игрока
  countScore,
  // Вывод результата игры
  getResult,
  // Подсчет жизней из ответа
  countLives,
  // Смена уровня
  changeLevel,
  // Проверка таймера
  getTimeLeft,
  // Получить тип игры по составу обьекта с вариантами ответов
  getGameMode,
  // Функция проверки ответа для игры по жанрам
  checkAnswerByGenre,
  // Функция проверки ответа для игры по артистам
  checkAnswerByArtist,
  // Функция подсчёта бонусных очков
  countBonusScore
};
