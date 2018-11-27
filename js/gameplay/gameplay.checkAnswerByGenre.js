/**
 * Проверяет правильный ответ в игре на определение жанра
 * @param {Array} questions Массив с обьектами вопросов
 * @param {Array} answers Массив с ответами пользователя
 * @return {boolean} Возвращает true, если игрок ответил правильно, иначе false
 */
export default (questions, answers) => {
  // Клонируем ключи ответов
  const questionsValid = [];
  questions.slice().forEach((item) => {
    questionsValid.push(item.valid);
  });
  for (const i of questionsValid.keys()) {
    if (questionsValid[i] !== answers[i]) {
      return false;
    }
  }
  return true;
};
