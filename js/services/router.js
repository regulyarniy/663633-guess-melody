import GameModel from "../models/game-model";
import GameController from "../controllers/game-controller";
import WelcomeController from "../controllers/welcome-controller";
import FailController from "../controllers/fail-controller";
import ResultController from "../controllers/result-controller";

export default class Router {
  // Страница приветствия
  static showWelcome(model = new GameModel(), context) {
    const welcomeController = new WelcomeController(model, context);
    welcomeController.init();
  }

  // Страница игрового процесса
  static showGame(model, context) {
    const gameController = new GameController(model, context);
    gameController.init();
  }

  // Страница проигрыша
  static showFail(model, context, isTimeFail) {
    const failController = new FailController(model, context, isTimeFail);
    failController.init();
  }

  // Страница результатов и статистики
  static showResult(model, context) {
    const resultController = new ResultController(model, context);
    resultController.init();
  }
}
