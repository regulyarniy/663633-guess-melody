import GameModel from "../models/game-model";
import GameController from "../controllers/game-controller";
import WelcomeController from "../controllers/welcome-controller";
import FailController from "../controllers/fail-controller";
import ResultController from "../controllers/result-controller";

export default class Router {
  // Страница приветствия
  static showWelcome() {
    const gameModel = new GameModel();
    const welcomeController = new WelcomeController(gameModel);
    welcomeController.init();
  }

  // Страница игрового процесса
  static showGame(gameModel) {
    const gameController = new GameController(gameModel);
    gameController.init();
  }

  // Страница проигрыша
  static showFail(gameModel, isTimeFail) {
    const failController = new FailController(gameModel, isTimeFail);
    failController.init();
  }

  // Страница результатов и статистики
  static showResult(gameModel) {
    const resultController = new ResultController(gameModel);
    resultController.init();
  }
}
