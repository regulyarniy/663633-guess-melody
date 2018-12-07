const RADIX = 10; // Основание системы счисления
const CIRCLE_FORMULA = 2 * Math.PI;
/**
 * Анимирует таймер заданное количество секунд
 * @param {Element} timerElement Элемент таймера
 * @param {Number} time Количество секунд
 */
export default (timerElement, time) => {
  const radius = parseInt(timerElement.getAttribute(`r`), RADIX); // Радиус окружности
  const circumference = Math.floor(CIRCLE_FORMULA * radius); // Длина окружности
  timerElement.setAttribute(`stroke-dasharray`, circumference.toString(RADIX)); // Устанавливаем начальное значение обводки
  const timerElementClassList = [...timerElement.classList].join(`.`); // Получаем список классов элемента
  const style = document.createElement(`style`); // Создаем элемент с тегом style
  style.innerHTML = `${
    timerElement.tagName
  }.${timerElementClassList} {transition: ${time}s stroke-dashoffset linear; will-change: stroke-dashoffset;}`; // Задаем transition c нужным временем
  timerElement.appendChild(style); // Присоединяем элемент style
  setTimeout(()=> {
    timerElement.setAttribute(`stroke-dashoffset`, circumference);
  }, 100); // Устанавливаем начальное смещение обводки
};
