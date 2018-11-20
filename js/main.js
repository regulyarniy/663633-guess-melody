import render from './render';
import screenWelcome from "./templates/welcome";
import screenGameGenre from './templates/game-genre';
import screenGameArtist from './templates/game-artist';
import screenResultSuccess from './templates/result-success';
import screenFailTries from './templates/fail-tries';

const screens = {
  screenWelcome,
  screenGameGenre,
  screenGameArtist,
  screenResultSuccess,
  screenFailTries
};

//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, function () {
  // Переход на экран приветствия
  render(`screenWelcome`, screens);
});


