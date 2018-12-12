const { BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

const VkLoginWindow = require('./VkLogin');

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

  ipcMain.on('r-to-e-audio-upload-list', async (event, path) => {
    console.log('on');
    const audioList = await fs.promises.readFile(path, 'utf8');
    window.webContents.send('e-to-r-audio-upload-list', audioList);
  });

  VkLoginWindow.createWindow(window);
};

module.exports = {
  window,
  createWindow
};