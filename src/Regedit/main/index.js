const { app } = require('electron');

function onReady() {   
    const RegeditUtil = require('./regeditUtil.js');
    RegeditUtil.checkAppIsInstalled('WeChat', function(values){
        console.log(values);
    });
}
  
app.on('ready', onReady);