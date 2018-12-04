// Экран приветствия
import {changeScreen} from '../services/utils';
import WelcomeView from "../views/welcome-view";

const welcome = function (context) {
  // Инициализируем представление
  const view = new WelcomeView();
  view.onStartGame = () => {
    context.startNewGame();
    context.templates.game(context);
  };

  // Отрисовка в DOM
  changeScreen(view.element);
};

export default welcome;
