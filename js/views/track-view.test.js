import {assert} from 'chai';
import testSet from '../services/test-set';
import TrackView from './track-view';

testSet();

describe(`Класс представления трека для основного игрового экрана игры на жанр`, () => {
  const data = {
    id: 1,
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`
  };
  const trackView = new TrackView(data);

  it(`метод render() возвращает правильную разметку`, () => {
    assert.equal(trackView.render().outerHTML, `<div class="track"><button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="1" id="answer-1">
    <label class="game__check" for="answer-1">Отметить</label>
  </div></div>`);
  });

  it(`клик по кнопке 'Отметить' вызывает событие onChangeAnswer`, () => {
    let test = false;
    document.body.innerHTML = ``;
    document.body.appendChild(trackView.element);
    trackView.onChangeAnswer = () => {
      test = true;
    };
    const button = document.querySelector(`.game__check`);
    button.click();
    assert.equal(test, true);
  });

  it(`клик по кнопке проигрывания вызывает событие onControlAudio`, () => {
    let test = false;
    document.body.innerHTML = ``;
    document.body.appendChild(trackView.element);
    trackView.onControlAudio = () => {
      test = true;
    };
    const button = document.querySelector(`.track__button`);
    button.click();
    assert.equal(test, true);
  });

});
