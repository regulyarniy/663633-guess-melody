import {RoundTimer} from '../constants/constants';

const {RADIX, CIRCLE_FORMULA} = RoundTimer;

/**
 * Анимирует таймер заданное количество секунд
 * @param {Element} timerElement Элемент таймера
 * @param {Number} timeLeft Количество секунд
 * @param {Number} startTime Количество секунд, с которого начинался отсчет
 */
export default (timerElement, timeLeft, startTime) => {
  const radius = parseInt(timerElement.getAttribute(`r`), RADIX); // Радиус окружности
  const circumference = Math.floor(CIRCLE_FORMULA * radius); // Длина окружности
  const offset = circumference - ((startTime - timeLeft) / startTime) * circumference; // Поправка на начало отсчета
  timerElement.setAttribute(`stroke-dasharray`, offset.toString(RADIX)); // Устанавливаем начальное значение обводки
  const timerElementClassList = [...timerElement.classList].join(`.`); // Получаем список классов элемента
  const style = document.createElement(`style`); // Создаем элемент с тегом style
  style.innerHTML = `
  ${timerElement.tagName}.${timerElementClassList}
   {transition: ${timeLeft}s stroke-dashoffset linear; will-change: stroke-dashoffset;}
   `; // Задаем transition c нужным временем
  timerElement.appendChild(style); // Присоединяем элемент style
  setTimeout(()=> {
    timerElement.setAttribute(`stroke-dashoffset`, circumference);
  }, 100); // Устанавливаем начальное смещение обводки
};
