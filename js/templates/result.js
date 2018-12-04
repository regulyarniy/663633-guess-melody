// Экран выигрыша
import {changeScreen} from '../services/utils';
import gameplay from '../gameplay/gameplay';
import SuccessView from "../views/success-view";
import templates from "../templates";

const result = function (context) {
  const {game: gameStatus} = context;
  // Вычисляем результат
  const score = gameplay.countScore(gameStatus.answers, gameStatus.livesLeft);
  const bonusScore = gameplay.countBonusScore(gameStatus.answers, gameStatus.livesLeft);
  const mistakes = context.NEW_GAME.livesLeft - gameStatus.livesLeft;
  const fakeStatistics = [4, 6, 8, 1, 12, 10, 6, 8, 2]; // TODO real statistics
  const rating = gameplay.getResult(fakeStatistics, {score, livesLeft: gameStatus.livesLeft, timeLeft: gameStatus.timeLeft});
  const data = {
    time: gameStatus.timeLeft,
    score,
    bonusScore,
    mistakes,
    rating
  };

  // Инициализируем представление
  const view = new SuccessView(data);

  // Возврат к экрану начала игры
  view.onResetGame = () => {
    templates.welcome(context);
  };

  // Отрисовка в DOM
  changeScreen(view.element);

};


export default result;
