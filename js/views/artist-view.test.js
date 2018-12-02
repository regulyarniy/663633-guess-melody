import {assert} from 'chai';
import testSet from '../services/test-set';
import ArtistView from './artist-view';

testSet();

describe(`Класс представления артиста для основного игрового экрана`, () => {
  const data = {
    id: 1,
    pictureURL: `https://via.placeholder.com/150`,
    artist: `Пелагея`
  };
  const artistView = new ArtistView(data);

  it(`метод render() возвращает правильную разметку`, () => {
    assert.equal(artistView.render().outerHTML, `<div class="artist"><input class="artist__input visually-hidden" type="radio" name="answer" value="1" id="answer-1">
  <label class="artist__name" for="answer-1">
    <img class="artist__picture" src="https://via.placeholder.com/150" alt="Пелагея">
    Пелагея
  </label></div>`);
  });

  it(`клик по элементу формы выполняет событие onAnswer`, () => {
    let test = false;
    document.body.innerHTML = ``;
    document.body.appendChild(artistView.element);
    artistView.onAnswer = () => {
      test = true;
    };
    const button = document.querySelector(`.artist__input`);
    button.click();
    assert.equal(test, true);
  });
});
