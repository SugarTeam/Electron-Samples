# Regedit

在开发一个windows的应用程序中，读取注册表信息是很常见的操作。通过注册表，我们可以实现如判断其他应用是否安装、修改系统默认行为等功能。

该功能以来Node的三方模块Regedit实现

Demo中实现了一个RegeditUtil类，该类通过Regedit模块实现了判断应用程序是否安装的功能。

## 启动命令

```bash
npm install
electron main
```

## 官方API

[Regedit](https://www.npmjs.com/package/regedit)