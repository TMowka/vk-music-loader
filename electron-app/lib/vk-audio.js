const fetch = require('node-fetch');
const vkAudioDecode = require('./vk-audio-decode');
const fs = require('fs');

class VkAudio {
  constructor(userId) {
    this.userId = userId;

    this.getAudioList = this.getAudioList.bind(this);
    this.parseAudioData = this.parseAudioData.bind(this);
  }

  * getAudioList(cookieHeader, count) {
    for (let i = 0; i < Math.ceil(count / 100); i++) {
      yield fetch('https://m.vk.com/audios' + this.userId, {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/x-www-form-urlencoded',
          'x-requested-with': 'XMLHttpRequest',
          cookie: cookieHeader
        },
        body: '_ajax=1&offset=' + i * 100,
        method: 'POST',
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => Object.values(res[3][0]).map(data => this.parseAudioData(data)));
    }
  }

  downloadAudio(url, path) {
    return fetch(url, {
      method: 'GET'
    })
      .then(res => {
        const dest = fs.createWriteStream(path);
        res.body.pipe(dest);
      });
  }

  parseAudioData(data) {
    return {
      url: vkAudioDecode(this.userId)(data[2]),
      artist: data[3],
      name: data[4],
      duration: data[5]
    };
  }
}

module.exports = VkAudio;
