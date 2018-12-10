const VkAudio = require('./lib/vk-audio');

const getAudioListGen = (userId, cookieHeader, count) => {
  const vkAudio = new VkAudio(userId);
  return vkAudio.getAudioList(cookieHeader, count);
};

module.exports = {
  getAudioListGen
};
