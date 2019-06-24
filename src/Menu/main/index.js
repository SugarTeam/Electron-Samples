const { app, BrowserWindow, Menu, MenuItem } = require('electron');

let template = [{
  label: '操作',
  submenu: [{
    label: '复制',
    role: 'copy'
  },{
    lable: '剪切',
    role: 'cut'
  }]
}]

const menu = Menu.buildFromTemplate(template);

//通过MenuItem可以动态加减菜单栏
const menuItem = new MenuItem({
    label: '最小化',
    role: 'minimize'
  });
  menu.append(menuItem); 

Menu.setApplicationMenu(menu);

function createWindow () {   
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