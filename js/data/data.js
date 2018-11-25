// Начальное состояние игры
export const NEW_GAME = Object.freeze({
  currentLevel: 0,
  livesLeft: 3,
  answers: [],
  timeLeft: 300,
  bonusTimeLeft: 30
});

// Данные для ответов
export const ANSWERS_DATA = [
  {
    genre: `Jazz`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    answers: [
      {id: 1, artist: `Kevin MacLeod`, pictureURL: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Audionautix`, pictureURL: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`, valid: true}
    ]
  },
  {
    genre: `Rock`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: false},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`, valid: false},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`, valid: true},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`, valid: true}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  },
  {
    genre: `R&B`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  },
  {
    genre: `R&B`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  },
  {
    genre: `R&B`,
    answers: [
      {id: 1, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 2, audioURL: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`, valid: true},
      {id: 3, audioURL: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`, valid: false},
      {id: 4, audioURL: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`, valid: false}
    ]
  },
  {
    audioURL: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    answers: [
      {id: 1, artist: `Riot`, pictureURL: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`, valid: false},
      {id: 2, artist: `Jingle Punks`, pictureURL: `https://i.vimeocdn.com/portrait/992615_300x300`, valid: false},
      {id: 3, artist: `Quincas Moreira`, pictureURL: `https://c1.staticflickr.com/5/4292/35845376076_fb06d3f3dc_b.jpg`, valid: true}
    ]
  }
];
