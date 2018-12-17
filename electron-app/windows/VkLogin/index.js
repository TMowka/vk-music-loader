const { BrowserWindow, ipcMain } = require('electron');
const VkAudio = require('../../lib/vk-audio');
const store = require('../../store');
const fs = require('fs');
const path = require('path');

let window;
const createWindow = (parent, callback) => {
  window = new BrowserWindow({
    width: 400,
    height: 682,
    resizable: false,
    parent
  });
  window.setMenu(null);

  const injectionPromise = fs.promises
    .readFile(path.join(__dirname, 'assets', 'injection.js'), 'utf8');
  window.webContents.on('dom-ready', async () => {
    const url = window.webContents.getURL();

    switch (url) {
      case 'https://m.vk.com/feed': {
        window.loadURL('https://m.vk.com/audio');
        break;
      }
      case 'https://m.vk.com/audio': {
        window.webContents.executeJavaScript(await injectionPromise);
        break;
      }
    }
  });

  window.on('close', () => {
    window.webContents.session.clearStorageData();
    if (callback)
      callback(window);
  });

  window.on('closed', () => {
    window = null;
  });

  window.loadURL('https://m.vk.com');
};

ipcMain.on('audio-count-event', async (event, audioCount) => {
  window.webContents.session.cookies.get({ domain: '.vk.com' }, async (event, cookies) => {
    const userId = cookies.find(c => c.name === 'l').value;
    const cookieHeader = cookies.map(c => c.name + '=' + c.value).join('; ');
    const vkAudio = new VkAudio(userId);
    const audioList = await vkAudio.getList(cookieHeader, audioCount);
    store.setAudioList(audioList);
    window.close();
  });
});


module.exports = {
  window,
  createWindow
};
