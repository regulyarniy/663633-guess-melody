import GameGenreView from "../views/game-genre-view";
import GameArtistView from "../views/game-artist-view";
import gameplay from "../gameplay/gameplay";
import {changeScreen} from "../services/utils";

const game = function (context) {

  const {ANSWERS_DATA, game: gameStatus} = context;

  const currentQuestion = ANSWERS_DATA[gameStatus.currentLevel];
  const isGenreGame = currentQuestion.hasOwnProperty(`genre`);

  /**
   * Переход к следующему экрану или игре
   */
  const showNextLevel = () => {
    gameStatus.currentLevel = gameplay.changeLevel(gameStatus.currentLevel, gameStatus.livesLeft);
    if (!(gameStatus.currentLevel === -1)) {
      game(context);
    } else if (gameStatus.livesLeft > 0) {
      context.templates.result(context);
    } else {
      context.templates.failByTries(context);
    }
  };

  /**
   * Сохранение ответа
   * @param {Array|Number} answer
   * @param {string} checkAnswerFunction Название функции по обработке ответов
   */
  const saveAnswer = (answer, checkAnswerFunction) => {
    const isAnswerSuccessful = gameplay[checkAnswerFunction](currentQuestion.answers, answer);
    const playerAnswer = {success: isAnswerSuccessful, time: 35}; // TODO implement time count
    gameStatus.answers.push(playerAnswer);
    gameStatus.livesLeft = gameplay.countLives(playerAnswer, gameStatus.livesLeft);
  };

  // Инициализируем представление
  let view;
  if (isGenreGame) {
    view = new GameGenreView({
      genre: currentQuestion.genre,
      tracks: currentQuestion.answers,
      livesLeft: gameStatus.livesLeft,
      timeLeft: gameStatus.timeLeft,
      bonusTimeLeft: gameStatus.bonusTimeLeft});

    view.onAnswer = (answers) => {
      saveAnswer(answers, `checkAnswerByGenre`);
      showNextLevel();
    };
  } else {
    view = new GameArtistView({
      audioURL: currentQuestion.audioURL,
      artists: currentQuestion.answers,
      livesLeft: gameStatus.livesLeft,
      timeLeft: gameStatus.timeLeft,
      bonusTimeLeft: gameStatus.bonusTimeLeft});

    view.onAnswer = (answers) => {
      saveAnswer(answers, `checkAnswerByArtist`);
      showNextLevel();
    };

  }

  // Возврат к экрану начала игры
  view.onResetGame = () => {
    context.templates.welcome(context);
  };

  // Отрисовка в DOM
  changeScreen(view.element);

};

export default game;
