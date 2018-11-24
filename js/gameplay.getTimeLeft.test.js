import {assert} from 'chai';
import gameplay from './gameplay';

describe(`Функция проверки таймера`, () => {
  let startDate;
  let checkDate;
  let timer;
  it(`возвращает 15 (секунд), при таймере в 30 с началом 15 секунд назад`, () => {
    checkDate = new Date(2018, 1, 1, 1, 1, 0, 1);
    startDate = new Date(2018, 1, 1, 1, 1, 15, 1);
    timer = 30;
    assert.equal(gameplay.getTimeLeft(startDate, timer, checkDate), 15);
  });
  it(`возвращает 15 (секунд), при таймере в 30
   с началом 15 секунд назад от текущего времени
   (без передачи аргумента проверяемой даты)`, () => {
    startDate = new Date();
    startDate.setTime(startDate.getTime() + 15000);
    timer = 30;
    assert.equal(gameplay.getTimeLeft(startDate, timer), 15);
  });
  it(`возвращает -1, если разница дат больше таймера и время вышло`, () => {
    startDate = new Date();
    startDate.setTime(startDate.getTime() + 32000);
    timer = 30;
    assert.equal(gameplay.getTimeLeft(startDate, timer), -1);
  });
});
