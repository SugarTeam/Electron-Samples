# Dll

调用windows的动态链接库DLL需要借助node ffi库

## 对接示例

下面代码给出了C语言和JS对接的具体例子

C代码
```c
extern "C"
{

    // callback function declare
    typedef void(*PfnStart)     (bool isStart);
    typedef void(*PfnStop)       (bool isStop);
    typedef void(*PfnPause)          (const char* ip, int len);
    typedef void(*PfnClose)         (const char* mac, int len, char separator);


    MCUHANDLERWRAP_API void _cdecl Start(PfnStart notify);

    MCUHANDLERWRAP_API void _cdecl Stop(PfnStop notify, int to_second = -1);
    MCUHANDLERWRAP_API void _cdecl Pause(PfnPause notify, int to_second = -1);
    MCUHANDLERWRAP_API void _cdecl Close(PfnClose notify, int to_second = -1);


}
```

js代码
见dll.js

## 注意事项

当需要给C方法传递回调时，不要使用匿名函数，比如：

```js
start: function(cb){
    demoLib.Start(ffi.Callback('void', ['bool'], function(isStart){
        cb && cb(isStart);
    }););
}
```

因为在运行过程中，匿名函数会被回收，当C代码调用该回调时，会发现指针为空。

为了避免回调函数被回收，可以将它挂载到global对象上。

```js
start: function(cb){
    global.demoStartCB = ffi.Callback('void', ['bool'], function(isStart){
        cb && cb(isStart);
    });
    demoLib.Start(global.demoStartCB);
}
```

