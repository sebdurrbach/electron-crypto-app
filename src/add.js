const electron = require('electron');
const remote = electron.remote;
const ipc = require('electron').ipcRenderer;

let closeBtn = document.getElementById('closeBtn');
let updateBtn = document.getElementById('updateBtn');
let currentWindow = remote.getCurrentWindow();

closeBtn.addEventListener('click', () => {
  currentWindow.close();
});

updateBtn.addEventListener('click', () => {
  let newValue = document.getElementById('notifyVal').value;
  console.log(newValue);
  ipc.send('update-notify-value', newValue);
  currentWindow.close();
})