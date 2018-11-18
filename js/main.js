import render from './render';
import screenWelcome from './templates/welcome';

//  Действия после загрузки документа
document.addEventListener(`DOMContentLoaded`, function () {
  // Переход на экран приветствия
  render(screenWelcome);
});


