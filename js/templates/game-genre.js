// Экран игры на выбор жанра
import utils from '../utils';
import gameHeader from './game-header';
import gameplay from '../gameplay/gameplay';

const GameGenre = function (context) {
  const {render, game} = context;

  // Генерируем шаблон
  const getTrackTemplate = (data) => {
    return `
<div class="track">
  <button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="${data.audioURL}"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${data.id}" id="answer-${data.id}">
    <label class="game__check" for="answer-${data.id}">Отметить</label>
  </div>
</div>
`;
  };
  const tracksAnswers = context.ANSWERS_DATA[game.currentLevel].answers;
  const genre = context.ANSWERS_DATA[game.currentLevel].genre;
  const tracksTemplate = tracksAnswers.reduce((accumulator, currentValue) => {
    return accumulator + getTrackTemplate(currentValue);
  }, ``);
  const template = `
<section class="game game--genre">

  ${gameHeader(context)}

  <section class="game__screen">
    <h2 class="game__title">Выберите ${genre} треки</h2>
    <form class="game__tracks">
    
      ${tracksTemplate}
      
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
</section>
`;
  const fragment = utils.generateFragment(template);

  // Кешируем элементы шаблона
  const form = fragment.querySelector(`.game__tracks`);
  const answerElements = form.elements[`answer`];
  const buttonAnswer = fragment.querySelector(`.game__submit`);
  const buttonBack = fragment.querySelector(`.game__back`);

  // Без выбора пользователя кнопка ответа неактивна
  buttonAnswer.setAttribute(`disabled`, `true`);

  // Функция получения массива ответов
  const getAnswers = () => {
    const answers = [];
    answerElements.forEach(function (item) {
      answers.push(item.checked);
    });
    return answers;
  };

  // При изменении формы проверяем чекбоксы и активируем кнопку, если выбран ответ
  form.addEventListener(`change`, function () {
    const answers = getAnswers();
    const answered = answers.some((item) => {
      return item;
    });
    if (answered) {
      buttonAnswer.removeAttribute(`disabled`);
    } else {
      buttonAnswer.setAttribute(`disabled`, `true`);
    }
  });

  // Переход к следующему экрану
  buttonAnswer.addEventListener(`click`, function (e) {
    e.preventDefault();
    const answers = getAnswers();
    const isAnswerSuccessful = gameplay.checkAnswerByGenre(context.ANSWERS_DATA[context.game.currentLevel].answers, answers);
    const playerAnswer = {success: isAnswerSuccessful, time: 35}; // TODO implement time count
    context.game.answers.push(playerAnswer);
    context.game.livesLeft = gameplay.countLives(playerAnswer, context.game.livesLeft);
    context.game.currentLevel = gameplay.changeLevel(game.currentLevel, game.livesLeft); // TODO implement success screen
    if (!(context.game.currentLevel === -1)) {
      render(gameplay.getGameMode(context.ANSWERS_DATA[context.game.currentLevel]), context);
    } else if (context.game.livesLeft > 0) {
      render(`ResultSuccess`, context);
    } else {
      render(`FailTries`, context);
    }
  });

  // Возврат на экран приветствия
  buttonBack.addEventListener(`click`, function (e) {
    e.preventDefault();
    render(`Welcome`, context);
  });

  // Метод возвращает разметку
  this.generate = function () {
    return fragment;
  };
};

export default GameGenre;
