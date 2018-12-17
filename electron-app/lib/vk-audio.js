const fetch = require('node-fetch');
const vkAudioDecode = require('./vk-audio-decode');

class VkAudio {
  constructor(userId) {
    this.userId = userId;

    this.getList = this.getList.bind(this);
    this.parse = this.parse.bind(this);
  }

  async getList(cookieHeader, count) {
    let audioList = [];
    for (let i = 0; i < count; i += 100) {
      const res = await fetch('https://m.vk.com/audios' + this.userId, {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/x-www-form-urlencoded',
          'x-requested-with': 'XMLHttpRequest',
          cookie: cookieHeader
        },
        body: '_ajax=1&offset=' + i,
        method: 'POST',
        mode: 'cors'
      })
        .then(res => res.json());

      const chunk = Object.values(res[3][0]).map(data => this.parse(data));
      audioList = audioList.concat(chunk);
    }

    return audioList;
  }

  download(url) {
    return fetch(url, { method: 'GET' });
  }

  parse(data) {
    return {
      url: vkAudioDecode(this.userId)(data[2]),
      artist: data[3],
      name: data[4],
      duration: data[5]
    };
  }
}

module.exports = VkAudio;
