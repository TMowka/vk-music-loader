const { BrowserWindow, ipcMain } = require('electron');
const core = require('../../../core');
const fs = require('fs');
const path = require('path');
const config = require('config');
const JSONStream = require('JSONStream');

let window;
const createWindow = parent => {
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

  window.on('closed', () => {
    window = null;
  });

  window.loadURL('https://m.vk.com');
};

ipcMain.on('audio-count-event', async (event, audioCount) => {
  window.webContents.session.cookies.get({ domain: '.vk.com' }, async (event, cookies) => {
    const userId = cookies.find(c => c.name === 'l').value;
    const cookieHeader = cookies.map(c => c.name + '=' + c.value).join('; ');
    const getAudioListGen = core.getAudioListGen(userId, cookieHeader, audioCount);

    const file = fs.createWriteStream(config.audioListPath);
    const jsonWriter = JSONStream.stringify();
    jsonWriter.pipe(file);
    for (let audioBatch of getAudioListGen)
      for (let audio of await audioBatch)
        jsonWriter.write(audio);

    jsonWriter.end();
    window.close();
  });
});


module.exports = {
  window,
  createWindow
};
