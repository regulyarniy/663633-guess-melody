import templates from './templates/index';
import {NEW_GAME, ANSWERS_DATA} from './constants/constants';

const context = {
  templates,
  game: {},
  ANSWERS_DATA,
  NEW_GAME,
  startNewGame() {
    this.game = JSON.parse(JSON.stringify(this.NEW_GAME));
    this.game.startTime = new Date();
  }
};

//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, () => {
  templates.welcome(context);
});
