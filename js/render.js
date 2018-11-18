// Отрисовка шаблона в DOM
export default function (fragment) {
  const app = document.querySelector(`.app`);
  const main = document.querySelector(`.main`);
  app.removeChild(main);
  app.appendChild(fragment);
}
