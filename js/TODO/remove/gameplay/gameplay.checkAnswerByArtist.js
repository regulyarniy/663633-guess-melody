const RADIX = 10; // Основание для приведения к целому
/**
 * Проверяет правильный ответ в игре на определение артиста
 * @param {Array} questions Массив с обьектами вопросов
 * @param {Number} answer Номер ответа, который выбрал игрок
 * @return {boolean} Возвращает true, если игрок ответил правильно, иначе false
 */
export default (questions, answer) => {
  // Находим id правильного ответа
  let validId;
  for (const question of questions) {
    if (question.valid === true) {
      validId = question.id;
      break;
    }
  }
  return parseInt(answer, RADIX) === validId;
};
