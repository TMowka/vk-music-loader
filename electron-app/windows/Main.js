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
    width: 1100,
    height: 550
  });
  const loadURL = process.env.ENV === 'development'
    ? 'http://localhost:3000'
    : url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  if (process.env.ENV !== 'development')
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
  const savePath = dialog.showSaveDialog({
    defaultPath: path.join(app.getPath('documents'), 'audio.json')
  });
  if (!savePath)
    return;

  await fs.promises.writeFile(savePath, JSON.stringify(store.getAudioList()));
});

ipcMain.on('RtoE-audio-download', async (event, key) => {
  const audio = store.audioList.find(audio => audio.key === key);
  const fullName = audio.artist + ' - ' + audio.name;
  const fileName = fullName.replace(/[/\\?%*:|"<>]/g, '_') + '.mp3';
  const savePath = dialog.showSaveDialog({
    defaultPath: path.join(app.getPath('downloads'), fileName)
  });
  if (!savePath)
    return;

  const vkAudio = new VkAudio();

  window.webContents.send('EtoR-audio-download-start', fullName);
  const res = await vkAudio.download(audio.url);
  const dest = fs.createWriteStream(savePath);
  const totalSize = res.headers.get('content-length');
  let downloadedSize = 0;
  res.body.on('data', chunk => {
    downloadedSize += chunk.length;
    const progress = Math.round((downloadedSize / totalSize + 0.00001) * 100);
    window.webContents.send('EtoR-audio-download-progress', progress);
  });
  res.body.on('end', () => {
    window.webContents.send('EtoR-audio-download-complete');
  });
  res.body.pipe(dest);
});

ipcMain.on('RtoE-audio-download-all', () => {
  const savePath = dialog.showOpenDialog({
    defaultPath: app.getPath('downloads'),
    properties: ['openDirectory']
  });
  if (!savePath)
    return;
});

module.exports = {
  window,
  createWindow
};