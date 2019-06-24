const { app, BrowserWindow, Menu, Tray } = require('electron');

function createWindow () {   
    
    let tray = null
    tray = new Tray('./tray.jpg')
    const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('demo')
    tray.setContextMenu(contextMenu);

    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    win.loadFile('./renderer/index.html')
}
  
app.on('ready', createWindow);