const { BrowserWindow, ipcMain } = require('electron');
const VkAudio = require('../../../lib/vk-audio');
const fs = require('fs');
const path = require('path');

let window;
const createWindow = parent => {
  window = new BrowserWindow({
    width: 400,
    height: 682,
    resizable: false,
    parent
  });
  window.setMenu(null);

  const injection = fs.readFileSync(path.join(__dirname, 'assets', 'injection.js'), 'utf8');
  window.webContents.on('dom-ready', () => {
    const url = window.webContents.getURL();

    switch (url) {
      case 'https://m.vk.com/feed': {
        window.loadURL('https://m.vk.com/audio');
        break;
      }
      case 'https://m.vk.com/audio': {
        window.webContents.executeJavaScript(injection);
        break;
      }
    }
  });

  window.on('closed', () => {
    window = null;
  });

  window.loadURL('https://m.vk.com');
};

ipcMain.on('audio-count-event', async (event, audioCount) => {
  window.webContents.session.cookies.get({ domain: '.vk.com' }, async (event, cookies) => {
    const userId = cookies.find(c => c.name === 'l').value;
    const vkAudio = new VkAudio(userId);
    //const audioList = await vkAudio.getAudioList(cookies, audioCount);
    //console.log(audioList);

    //window.close();
  });
});


module.exports = {
  window,
  createWindow
};