const fetch = require('node-fetch');
const VkAudio = require('./lib/vk-audio');
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let window = new BrowserWindow({
    width: 400,
    height: 682,
    resizable: false
  });
  window.setMenu(null);
  const session = window.webContents.session;

  window.on('closed', () => {
    window = null;
  });

  window.loadURL('https://m.vk.com');

  window.webContents.on('dom-ready', () => {
    const url = window.webContents.getURL();

    switch (url) {
      case 'https://m.vk.com/feed': {
        session.cookies.get({ domain: '.vk.com' }, async (event, cookies) => {
          const userId = cookies.find(c => c.name === 'l').value;
          const audioList = await getAudioList(cookies, userId, 1000);
          console.log(audioList);
        });
        //window.hide();
        break;
      }
    }
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const getAudioList = async (cookies, userId, count) => {
  const vkAudio = new VkAudio(userId);
  let list = [];

  for (let i = 0; i < Math.ceil(count / 100); i++) {
    const res = await fetch('https://m.vk.com/audios' + userId, {
      credentials: 'include',
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded',
        'x-requested-with': 'XMLHttpRequest',
        cookie: cookies.map(c => c.name + '=' + c.value).join('; ')
      },
      body: '_ajax=1&offset=' + i * 100,
      method: 'POST',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(res => Object.values(res[3][0]).map(data => vkAudio.parseAudioData(data)));

    list = list.concat(res);
  }

  return list;
};