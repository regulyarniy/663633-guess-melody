import render from './render.js';
import screenWelcome from './templates/welcome.js';

//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, function () {
  // Переход на экран приветствия
  render(screenWelcome);
});


