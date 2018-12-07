import GameModel from "../models/game-model";
import GameController from "../controllers/game-controller";
import WelcomeController from "../controllers/welcome-controller";
import FailController from "../controllers/fail-controller";
import ResultController from "../controllers/result-controller";

export default class Router {
  // Страница приветствия
  static showWelcome() {
    const welcomeController = new WelcomeController();
    welcomeController.init();
  }

  // Страница игрового процесса
  static showGame() {
    const gameModel = new GameModel();
    const gameController = new GameController(gameModel);
    gameController.init();
  }

  // Страница проигрыша
  static showFail(isTimeFail) {
    const failController = new FailController(isTimeFail);
    failController.init();
  }

  // Страница результатов и статистики
  static showResult(model) {
    const resultController = new ResultController(model);
    resultController.init();
  }
}
