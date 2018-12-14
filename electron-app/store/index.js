const Entities = require('html-entities').AllHtmlEntities;
const uuid = require('uuid/v4');

const entities = new Entities();

class Store {
  constructor() {
    this.audioList = [];

    this.getAudioList = this.getAudioList.bind(this);
    this.setAudioList = this.setAudioList.bind(this);
  }

  parseAudio(audio) {
    return {
      key: uuid(),
      artist: entities.decode(audio.artist),
      name: entities.decode(audio.name),
      duration: Number(audio.duration) || 0,
      url: audio.url
    };
  }

  // without keys
  getAudioList() {
    return this.audioList.map(audio => ({
      artist: audio.artist,
      name: audio.name,
      duration: audio.duration,
      url: audio.url
    }));
  }

  setAudioList(audioList) {
    if (!audioList || audioList.length === 0)
      return;

    this.audioList = [];
    for (let audio of audioList) {
      if (!audio.url)
        continue;

      this.audioList.push(this.parseAudio(audio));
    }
  }
}

module.exports = new Store();