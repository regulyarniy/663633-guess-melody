export default {
  // Генерация HTML из строки
  generateFragment: (template) => {
    const wrapper = document.createElement(`section`);
    wrapper.innerHTML = template.trim();
    wrapper.classList.add(`main`);
    return wrapper;
  },

  // Возвращает случайное целое число между min (включительно) и max (не включая max)
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
