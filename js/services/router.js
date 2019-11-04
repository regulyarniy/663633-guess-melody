import GameModel from "../models/game-model";
import GameController from "../controllers/game-controller";
import WelcomeController from "../controllers/welcome-controller";
import FailController from "../controllers/fail-controller";
import ResultController from "../controllers/result-controller";
import ErrorController from "../controllers/error-controller";

export default class Router {
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;

    return this;
  }

  // Страница приветствия
  showWelcome(model = new GameModel()) {
    const welcomeController = new WelcomeController(model);
    welcomeController.init();
  }

  // Страница игрового процесса
  showGame(model) {
    const gameController = new GameController(model);
    gameController.init();
  }

  // Страница проигрыша
  showFail(model, isTimeFail) {
    const failController = new FailController(model, isTimeFail);
    failController.init();
  }

  // Страница результатов и статистики
  showResult(model) {
    const resultController = new ResultController(model);
    resultController.init();
  }

  // Страница ошибки
  showError(error) {
    const errorController = new ErrorController(error);
    errorController.init();
  }
}
