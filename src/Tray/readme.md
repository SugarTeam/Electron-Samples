# Tray

托盘菜单指的是应用程序在任务栏右边的小图标

![](https://user-gold-cdn.xitu.io/2019/6/13/16b50080f009c9b9?w=206&h=127&f=png&s=15120)

![](https://user-gold-cdn.xitu.io/2019/6/13/16b500827ff309c7?w=404&h=324&f=png&s=26588)

我们通过electron中的Tray和Menu模块来实现自定义托盘，代码如下

```js
let tray = null
tray = new Tray('./tray.png')
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
])
tray.setToolTip('demo')
tray.setContextMenu(contextMenu);
```
Tray模块负责生成托盘ICON，Menu模块负责右键托盘ICON后弹出的菜单。

## 启动命令

```bash
electron main
```

## 官方API

[Tray](https://electronjs.org/docs/api/tray)
