// Экран игры на выбор жанра
import utils from '../utils';
import gameHeader from './game-header';

const tracksAnswers = [1, 2, 3, 4];
const getTrackTemplate = (data) => `
<div class="track">
  <button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${data}" id="answer-${data}">
    <label class="game__check" for="answer-${data}">Отметить</label>
  </div>
</div>
`;

const tracksTemplate = tracksAnswers.reduce((accumulator, currentValue) => {
  return accumulator + getTrackTemplate(currentValue);
}, ``);


const GameGenre = function (screens, render) {
  const template = `
<section class="game game--genre">

  ${gameHeader}

  <section class="game__screen">
    <h2 class="game__title">Выберите инди-рок треки</h2>
    <form class="game__tracks">
    
      ${tracksTemplate}
      
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
</section>
`;

  const fragment = utils.generateFragment(template);
  const form = fragment.querySelector(`.game__tracks`);
  const answerElements = form.elements[`answer`];
  const buttonAnswer = fragment.querySelector(`.game__submit`);
  const buttonBack = fragment.querySelector(`.game__back`);

  // Без выбора пользователя кнопка ответа неактивна
  buttonAnswer.setAttribute(`disabled`, `true`);

  // При изменении формы проверяем чекбоксы и активируем кнопку, если выбран ответ
  form.addEventListener(`change`, function () {
    const answer = [];
    answerElements.forEach(function (item) {
      answer.push(item.checked);
    });
    const answered = answer.some((item) => {
      return item;
    });
    if (answered) {
      buttonAnswer.removeAttribute(`disabled`);
    } else {
      buttonAnswer.setAttribute(`disabled`, `true`);
    }
  });

  // Переход на экран второй игры
  buttonAnswer.addEventListener(`click`, function (e) {
    e.preventDefault();
    render(`screenGameArtist`, screens);
  });

  // Возврат на экран приветствия
  buttonBack.addEventListener(`click`, function (e) {
    e.preventDefault();
    render(`screenWelcome`, screens);
  });

  this.generate = function () {
    return fragment;
  };
};

export default GameGenre;
