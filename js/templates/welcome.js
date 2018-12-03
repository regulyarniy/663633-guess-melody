// Экран приветствия
import {changeScreen} from '../services/utils';
import WelcomeView from "../views/welcome-view";

const welcome = function (context) {
//   const {render} = context;
//   const template = `
// <section class="welcome">
//   <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
//   <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
//   <h2 class="welcome__rules-title">Правила игры</h2>
//   <p class="welcome__text">Правила просты:</p>
//   <ul class="welcome__rules-list">
//     <li>За 5 минут нужно ответить на все вопросы.</li>
//     <li>Можно допустить 3 ошибки.</li>
//   </ul>
//   <p class="welcome__text">Удачи!</p>
// </section>
// `;
//
//   const fragment = utils.generateFragment(template);
//   const buttonPlay = fragment.querySelector(`.welcome__button`);
//
//   // Переход на экран игры
//   buttonPlay.addEventListener(`click`, (e) => {
//     e.preventDefault();
//     context.startNewGame();
//     render(gameplay.getGameMode(context.ANSWERS_DATA[context.game.currentLevel]), context);
//   });

  const view = new WelcomeView();
  view.onStartGame = () => {
    context.startNewGame();
    context.templates.game(context);
  };
  changeScreen(view.element);
};

export default welcome;
