const electron = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');
const axios = require('axios');
const ipc = require('electron').ipcRenderer;
const notifier = require('node-notifier');

let notifyBtn = document.getElementById('notifyBtn');
let price = document.querySelector('h1');
let targetPrice = document.getElementById('target-price');
let targetPriceVal;

let myNotification = {
  body: {
    title: 'BTC Alert',
    message: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png'),
    sound: true,
    wait: false
  }, notified: false
}

const getBTC = async () => {
  let result = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD');
  let cryptos = result.data.BTC.USD;
  price.innerHTML = `$${cryptos.toLocaleString('en')}`;

  if (targetPriceVal !== null && targetPriceVal < cryptos && !myNotification.notified) {
    notifier.notify(myNotification.body);
    myNotification.notified = true;
  }
};

getBTC();
setInterval(getBTC, 30000);

notifyBtn.addEventListener('click', () => {
  let win = new BrowserWindow({ width: 400, height: 200, frame: false, transparent: true, alwaysOnTop: true });
  win.on('close', () => win = null );
  win.loadFile('src/add.html');
  win.show();
});

ipc.on('targetPriceVal', (event, arg) => {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = `$${targetPriceVal.toLocaleString('en')}`;
  myNotification.notified = false;
});