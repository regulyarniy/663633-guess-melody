// Отрисовка шаблона в DOM
const app = document.querySelector(`.app`);

export default function render(screenName, screens) {
  const main = document.querySelector(`.main`);
  app.removeChild(main);
  const screen = new screens[screenName](screens, render);
  app.appendChild(screen.generate());
}
