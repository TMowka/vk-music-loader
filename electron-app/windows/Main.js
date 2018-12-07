const { BrowserWindow } = require('electron');

const VkLoginWindow = require('./VkLogin');

let window;
const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600
  });
  setTimeout(() => {
    VkLoginWindow.createWindow(window);
  }, 1000);

  window.on('closed', () => {
    VkLoginWindow.window = null;
    window = null;
  });
};

module.exports = {
  window,
  createWindow
};