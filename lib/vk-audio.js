const fetch = require('node-fetch');
const vkAudioCore = require('./vk-audio-core');

class VkAudio {
  constructor(userId) {
    this.userId = userId;

    this.getAudioList = this.getAudioList.bind(this);
    this.parseAudioData = this.parseAudioData.bind(this);
  }

  async getAudioList(cookies, count) {
    let list = [];

    for (let i = 0; i < Math.ceil(count / 100); i++) {
      const res = await fetch('https://m.vk.com/audios' + this.userId, {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/x-www-form-urlencoded',
          'x-requested-with': 'XMLHttpRequest',
          cookie: cookies.map(c => c.name + '=' + c.value).join('; ')
        },
        body: '_ajax=1&offset=' + i * 100,
        method: 'POST',
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => Object.values(res[3][0]).map(data => this.parseAudioData(data)));

      list = list.concat(res);
    }

    return list;
  }

  parseAudioData(data) {
    return {
      url: vkAudioCore(this.userId)(data[2]),
      artist: data[3],
      name: data[4],
      duration: data[5]
    };
  }
}

module.exports = VkAudio;