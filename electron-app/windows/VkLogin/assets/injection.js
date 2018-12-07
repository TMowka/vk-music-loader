/* eslint-disable */

const disableEl = document.createElement('div');
disableEl.innerText = 'Getting audio list';
setInterval(() => {
  if (disableEl.innerText.length > 20)
    disableEl.innerText = 'Getting audio list';
  else
    disableEl.innerText += '.';
}, 600);
Object.assign(disableEl.style, {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: 999,
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#F8F9F9',
  fontSize: '24px'
});
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';
document.body.appendChild(disableEl);

const { ipcRenderer } = require('electron');

const audioCountEl = document.getElementsByClassName('audioPage__count')[0];
const audioCount = parseInt(audioCountEl.innerText, 10);
ipcRenderer.send('audio-count-event', audioCount);