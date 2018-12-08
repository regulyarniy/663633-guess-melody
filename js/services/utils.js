const APP_ROOT_ELEMENT_SELECTOR = `.app`;
const APP_SCREEN_ELEMENT_SELECTOR = `.main`;

/**
 * Конвертирует число секунд или минут в числительное в множественной форме
 * @example
 * // return `22 минуты`
 * convertTimeCounterToPluralString(22,`минут`);
 * @param {Number} number Числительное
 * @param {String} numericString
 * @return {*}
 */
export const convertTimeCounterToPluralString = (number, numericString) => {
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
/**
 * Конвертирует число ошибок в строку во множ. форме
 * @param {Number} mistakes Количество ошибок
 * @return {string} Возвращает строку вида `4 ошибки`
 */
export const convertMistakesToPluralString = (mistakes) => {
  switch (mistakes) {
    case 0:
      return `${mistakes} ошибок`;
    case 1:
      return `${mistakes} ошибку`;
    default:
      return `${mistakes} ошибки`;
  }

};

/**
 * Функция смены экранов в DOM-дереве
 * @param {HTMLElement} newScreen Узел нового экрана
 * @param {HTMLElement} [parentElement = .APP_ROOT_ELEMENT_SELECTOR] Корневой узел
 */
export const changeScreen = (newScreen, parentElement = document.querySelector(APP_ROOT_ELEMENT_SELECTOR)) => {
  const oldScreen = parentElement.querySelector(APP_SCREEN_ELEMENT_SELECTOR);
  parentElement.replaceChild(newScreen, oldScreen);
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
    const secondsString = `${secondsAfterMinutes} ${convertTimeCounterToPluralString(secondsAfterMinutes, `секунд`)}`;
    if (minutes > 0) {
      minutesString = `${minutes} ${convertTimeCounterToPluralString(minutes, `минут`)} и `;
    }
    return `${minutesString}${secondsString}`;
  }
};
