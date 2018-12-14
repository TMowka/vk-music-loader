require('dotenv').config();
const { BrowserWindow, ipcMain, dialog, app } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const Settings = require('../settings');
const VkAudio = require('../lib/vk-audio');

const VkLoginWindow = require('./VkLogin');

const store = require('../store');
const settings = new Settings({
  configName: 'vk-audio-loader',
  defaults: {
    getAudioListAtStartup: true
  }
});

let window;
const createWindow = () => {
  window = new BrowserWindow({
    width: 1051,
    height: 502
  });
  const loadURL = process.env.ENV === 'development'
    ? 'http://localhost:3000'
    : url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  window.setMenu(null);
  window.loadURL(loadURL);

  window.on('closed', () => {
    VkLoginWindow.window = null;
    window = null;
  });

  if (settings.get('getAudioListAtStartup')) {
    VkLoginWindow.createWindow(window, () => {
      window.webContents.send('EtoR-audio-get', store.audioList);
    });
  }
};

ipcMain.on('RtoE-settings-set', (event, pair) => {
  settings.set(pair.key, pair.val);
  window.webContents.send('EtoR-settings-get', settings.get());
});

ipcMain.on('RtoE-settings-get', () => {
  window.webContents.send('EtoR-settings-get', settings.get());
});

ipcMain.on('RtoE-audio-synchronization', () => {
  VkLoginWindow.createWindow(window, () => {
    window.webContents.send('EtoR-audio-get', store.audioList);
  });
});

ipcMain.on('RtoE-audio-import', async () => {
  const openPaths = dialog.showOpenDialog({ properties: ['openFile'] });
  if (!openPaths || openPaths.length !== 1)
    return;

  const audioListStr = await fs.promises.readFile(openPaths[0], 'utf8');
  const audioList = JSON.parse(audioListStr);

  store.setAudioList(audioList);
  window.webContents.send('EtoR-audio-get', store.audioList);
});

ipcMain.on('RtoE-audio-export', async () => {
  const savePath = dialog.showSaveDialog();
  if (!savePath)
    return;

  await fs.promises.writeFile(savePath, JSON.stringify(store.getAudioList()));
});

ipcMain.on('RtoE-audio-download', async (event, key) => {
  const audio = store.audioList.find(audio => audio.key === key);
  const savePath = dialog.showSaveDialog({
    defaultPath: path.join(app.getPath('downloads'), `${audio.artist} - ${audio.name}.mp3`)
  });
  if (!savePath)
    return;

  const vkAudio = new VkAudio();

  await vkAudio.download(audio.url, savePath);
});

module.exports = {
  window,
  createWindow
};