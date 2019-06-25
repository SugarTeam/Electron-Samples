const { app } = require('electron');
const demoDll = require('./dll.js')

function onReady() {   
    demoDll.start();
}
  
app.on('ready', onReady);