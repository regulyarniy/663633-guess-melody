// Отрисовка шаблона в DOM
import utils from './utils.js';

export default function (fragment) {
  const app = document.querySelector(`.app`);
  const main = document.querySelector(`.main`);
  app.removeChild(main);
  app.appendChild(fragment);
}
