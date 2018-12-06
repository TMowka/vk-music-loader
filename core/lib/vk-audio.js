const aus = require('./audio_unmusk_source');

class VkAudio {
  constructor(userId) {
    this.aus = aus(userId);

    this.parseAudioData = this.parseAudioData.bind(this);
  }

  parseAudioData(data) {
    return {
      url: this.aus(data[2]),
      artist: data[3],
      name: data[4],
      duration: data[5]
    };
  }
}

module.exports = VkAudio;