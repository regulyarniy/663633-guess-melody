export default {
  // Генерация фрагмента из строки
  generateFragment: (template) => {
    return document.createRange().createContextualFragment(template);
  }
};
