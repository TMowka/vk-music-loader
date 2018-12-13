const { BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const core = require('../../core');
const Settings = require('../settings');

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
    width: 800,
    height: 600
  });
  const loadURL = process.env.ELECTRON_LOAD_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  window.loadURL(loadURL);

  window.on('closed', () => {
    VkLoginWindow.window = null;
    window = null;
  });

  ipcMain.on('RtoE-audio-upload-list', async () => {
    const paths = dialog.showOpenDialog({ properties: ['openFile'] });
    if (!paths || paths.length !== 1)
      return;

    const audioListStr = await fs.promises.readFile(paths[0], 'utf8');
    const audioList = JSON.parse(audioListStr);

    store.setAudioList(audioList);
    window.webContents.send('EtoR-audio-upload-list', store.audioList);
  });

  ipcMain.on('RtoE-audio-download-single', (event, url) => {
    const path = dialog.showSaveDialog();
    return path ? core.downloadAudio(url, path) : Promise.resolve();
  });

  ipcMain.on('RtoE-settings-set', (event, pair) => {
    settings.set(pair.key, pair.val);
    window.webContents.send('EtoR-settings-get', settings.get());
  });

  ipcMain.on('RtoE-settings-get', () => {
    window.webContents.send('EtoR-settings-get', settings.get());
  });

  if (settings.get('getAudioListAtStartup'))
    VkLoginWindow.createWindow(window);
};

module.exports = {
  window,
  createWindow
};