const VkAudio = require('./lib/vk-audio');

const getAudioListGen = (userId, cookieHeader, count) => {
  const vkAudio = new VkAudio(userId);
  return vkAudio.getAudioList(cookieHeader, count);
};

const downloadAudio = async (url, path) => {
  const vkAudio = new VkAudio();
  return vkAudio.downloadAudio(url, path);
};

module.exports = {
  getAudioListGen,
  downloadAudio
};
