const INTERVAL = 20; // Интервал обновления в мс
const INTERVALS_IN_SECOND = 1000 / INTERVAL; // Интервалов в секунде
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
  let stepCount = time * INTERVALS_IN_SECOND; // Количество шагов
  const stepLength = circumference / stepCount; // Смещение шага
  let currentOffset = 0; // Начальное смещение
  timerElement.setAttribute(`stroke-dashoffset`, currentOffset); // Устанавливаем начальное смещение обводки
  // Смещение обводки
  const nextStep = () => {
    currentOffset = currentOffset + stepLength;
    timerElement.setAttribute(`stroke-dashoffset`, currentOffset);
  };
  // Вызываем смещение по интервалу
  const animate = setInterval(() => {
    if (stepCount <= 0) {
      clearInterval(animate);
    } else {
      nextStep();
      stepCount--;
    }
  }, INTERVAL);
};

