import GameGenreView from "../views/game-genre-view";
import GameArtistView from "../views/game-artist-view";
import templates from "../templates";
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
    if (!(gameStatus.currentLevel === -1)) {
      // перехок к след вопросу
    } else if (context.game.livesLeft > 0) {
      // экран успеха
    } else {
      // экран провала
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

  view.onResetGame = () => {
    templates.welcome(context);
  };

  changeScreen(view.element);

};


//   const {render, game} = context;
//
//   // Генерируем шаблон
//   const getTrackTemplate = (data) => {
//     return `
// <div class="track">
//   <button class="track__button track__button--play" type="button"></button>
//   <div class="track__status">
//     <audio src="${data.audioURL}"></audio>
//   </div>
//   <div class="game__answer">
//     <input class="game__input visually-hidden" type="checkbox" name="answer" value="${data.id}" id="answer-${data.id}">
//     <label class="game__check" for="answer-${data.id}">Отметить</label>
//   </div>
// </div>
// `;
//   };
//   const tracksAnswers = context.ANSWERS_DATA[game.currentLevel].answers;
//   const genre = context.ANSWERS_DATA[game.currentLevel].genre;
//   const tracksTemplate = tracksAnswers.reduce((accumulator, currentValue) => {
//     return accumulator + getTrackTemplate(currentValue);
//   }, ``);
//   const template = `
// <section class="game game--genre">
//
//   ${gameHeader(context)}
//
//   <section class="game__screen">
//     <h2 class="game__title">Выберите ${genre} треки</h2>
//     <form class="game__tracks">
//
//       ${tracksTemplate}
//
//       <button class="game__submit button" type="submit">Ответить</button>
//     </form>
//   </section>
// </section>
// `;
//   const fragment = utils.generateFragment(template);
//
//   // Кешируем элементы шаблона
//   const form = fragment.querySelector(`.game__tracks`);
//   const answerElements = form.elements[`answer`];
//   const buttonAnswer = fragment.querySelector(`.game__submit`);
//   const buttonBack = fragment.querySelector(`.game__back`);
//
//   // Инициализируем кнопки проигрывания
//   audio.initializeTracks(`.track__button`, `audio`, fragment);
//
//   // Без выбора пользователя кнопка ответа неактивна
//   buttonAnswer.setAttribute(`disabled`, `true`);
//
//   // Функция получения массива ответов
//   const getAnswers = () => {
//     const answers = [];
//     answerElements.forEach(function (item) {
//       answers.push(item.checked);
//     });
//     return answers;
//   };
//
//   // При изменении формы проверяем чекбоксы и активируем кнопку, если выбран ответ
//   form.addEventListener(`change`, function () {
//     const answers = getAnswers();
//     const answered = answers.some((item) => {
//       return item;
//     });
//     if (answered) {
//       buttonAnswer.removeAttribute(`disabled`);
//     } else {
//       buttonAnswer.setAttribute(`disabled`, `true`);
//     }
//   });
//
//   // Переход к следующему экрану
//   buttonAnswer.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const answers = getAnswers();
//     const isAnswerSuccessful = gameplay.checkAnswerByGenre(context.ANSWERS_DATA[context.game.currentLevel].answers, answers);
//     const playerAnswer = {success: isAnswerSuccessful, time: 35}; // TODO implement time count
//     context.game.answers.push(playerAnswer);
//     context.game.livesLeft = gameplay.countLives(playerAnswer, context.game.livesLeft);
//     context.game.currentLevel = gameplay.changeLevel(game.currentLevel, game.livesLeft);
//     if (!(context.game.currentLevel === -1)) {
//       render(gameplay.getGameMode(context.ANSWERS_DATA[context.game.currentLevel]), context);
//     } else if (context.game.livesLeft > 0) {
//       render(`ResultSuccess`, context);
//     } else {
//       render(`FailTries`, context);
//     }
//   });
//
//   // Возврат на экран приветствия
//   buttonBack.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     render(`Welcome`, context);
//   });
//
//   // Метод возвращает разметку
//   this.generate = function () {
//     return fragment;
//   };
// };

export default game;
