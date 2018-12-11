// Экран проигрыша по попыткам
import FailTriesView from "../views/fail-tries-view";
import {changeScreen} from "../services/utils";

const failByTries = function (context) {

  // Инициализируем представление
  const view = new FailTriesView();

  view.onResetGame = () => {
    context.templates.welcome(context);
  };

  // Отрисовка в DOM
  changeScreen(view.element);
};

export default failByTries;
