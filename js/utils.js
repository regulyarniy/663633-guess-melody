/**
 * Конвертирует число в числительное в множественной форме
 * @example
 * // return `22 минуты`
 * convertNumericToPluralString(22,`минут`);
 * @param {Number} number Числительное
 * @param {String} numericString
 * @return {*}
 */
const convertNumericToPluralString = (number, numericString) => {
  const numberLong = number % 100;
  if (numberLong > 10 && numberLong < 15) {
    return numericString;
  }
  switch (number % 10) {
    case 1:
      return `${numericString}у`;
    case 2: case 3: case 4:
      return `${numericString}ы`;
  }
  return numericString;
};

export default {
  /**
   * Генерирует HTML-элемент section из строки
   * @param {string} template Строка с разметкой
   * @return {HTMLElement} Возвращает HTML-элемент section
   */
  generateFragment: (template) => {
    const wrapper = document.createElement(`section`);
    wrapper.innerHTML = template.trim();
    wrapper.classList.add(`main`);
    return wrapper;
  },
  /**
   * Генерирует целое случайное число в интервале
   * @param {Number} min Минимум (включительно >=)
   * @param {Number} max Максимум (исключительно <)
   * @return {Number} Возвращает целое число от min до max
   */
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  /**
   * Конвертирует секунды в удобочитаемую строку
   * @param {Number} seconds Количество секунд
   * @return {String} Возвращает строку вида - 1 минута и 10 секунд
   */
  convertSecondsToHumanReadableString: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsAfterMinutes = seconds % 60;
    let minutesString = ``;
    const secondsString = convertNumericToPluralString(secondsAfterMinutes, `секунд`);
    if (minutes > 0) {
      minutesString = `${convertNumericToPluralString(minutes, `минут`)} и `;
    }
    return `${minutesString}${secondsString}`
  },
  convertNumericToPluralString
};
