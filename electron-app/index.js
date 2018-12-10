const { app } = require('electron');

const MainWindow = require('./windows/Main');

app.on('ready', MainWindow.createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
