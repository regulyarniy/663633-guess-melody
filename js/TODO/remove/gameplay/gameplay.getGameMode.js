/**
 * Определение типа игры по структуре вопроса
 * @param {Object} answerData Обьект с данными вопроса
 * @return {*} Возвращает строку с именем экрана или -1, если передан некорректный агрумент
 */
export default (answerData) => {
  if (!(typeof answerData === `object`)) {
    return -1;
  }
  if (answerData.hasOwnProperty(`genre`)) {
    return `GameGenre`;
  } else if (answerData.hasOwnProperty(`audioURL`)) {
    return `GameArtist`;
  } else {
    return -1;
  }
};
