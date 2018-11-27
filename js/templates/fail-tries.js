// Экран проигрыша по попыткам
import utils from '../utils';

const FailTries = function (context) {
  const {render} = context;
  const template = `
<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Какая жалость!</h2>
  <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section>
`;

  const fragment = utils.generateFragment(template);
  const buttonReplay = fragment.querySelector(`.result__replay`);

  // Переход на экран приветствия
  buttonReplay.addEventListener(`click`, function (e) {
    e.preventDefault();
    render(`Welcome`, context);
  });

  this.generate = function () {
    return fragment;
  };
};

export default FailTries;
