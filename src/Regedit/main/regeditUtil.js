//关于注册表操作的工具类  regeditUtil.js
const regedit = require('regedit');
const RegMap = {
    'WeChat': {
        // 注冊表信息和注册表路径
        values: null,
        path: ['HKLM\\SOFTWARE\\WOW6432Node\\Tencent\\WeChat', 'HKLM\\SOFTWARE\\Tencent\\WeChat']
    }
};

const Regedit = {
    /**
     * 检查某app是否安装，在注册表中是否有记录
     */
    checkAppIsInstalled: function(appName, successCb, errorCb){

        let i = 0;
        checkRegedit(RegMap[appName].path[i], success, error);
        
        /**
         * 检测注册表是否存在
         * @param {*} path 注册表路径
         * @param {*} successCb 
         * @param {*} errorCb 
         */
        function checkRegedit(path, successCb, errorCb) {
            try { 
                regedit.list(path, function(err, result) {
                    if (err) {
                        errorCb();
                        console.error(err);
                        return;
                    }
                    RegMap[appName].values = result[path].values;
                    successCb(result[path].values);
                });
            } catch (error) {
                console.log(error)
            }
        }

        function success (values) {
            successCb && successCb(values);
        }

        function error () {
            i++;
            if (RegMap[appName].path[i]) {
                checkRegedit(RegMap[appName].path[i], success, error);
            } else {
                errorCb && errorCb();
            }
        }
    },

    /**
     * 获取app的exe启动路径
     */
    getAppExePath: function(appName, key, successCb, errorCb){

        if (!RegMap[appName].values) {
            this.checkAppIsInstalled(appName, 
                () => {
                    getValues(appName, key, successCb)
                }, errorCb)
        } else {
            getValues(appName, key, successCb)
        }

        function getValues(appName, key, successCb) {
            const value = RegMap[appName].values[key];
            successCb && successCb(value ? value.value : '');
        }

    }

};

module.exports = Regedit;