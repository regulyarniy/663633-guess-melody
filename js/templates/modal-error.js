// Модальное окно ошибки
import render from '../render.js';
import utils from '../utils.js';

const template = `
<section class="modal">
  <h2 class="modal__title">Произошла ошибка!</h2>
  <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
</section>
`;

const fragment = utils.generateFragment(template);

export default fragment;