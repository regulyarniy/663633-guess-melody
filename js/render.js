// Отрисовка шаблона в DOM
export default function render(screenName, context) {
  const {application, templates} = context;
  const main = application.querySelector(`.main`);
  application.removeChild(main);
  const screen = new templates[screenName](context);
  application.appendChild(screen.generate());
}
