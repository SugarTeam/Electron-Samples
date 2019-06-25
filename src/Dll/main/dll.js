try {
	var ffi = require('ffi');
	var path = require('path');
	var ref = require('ref');
    var stringPointer   = ref.types.CString;
    var libpath = path.join('./', 'DEMO.dll');
    
	var demoLib = ffi.Library(libpath, {
		'Start': ['void', ['pointer']],
		'Stop': ['void', ['pointer', 'int']],
		'Pause': ['void', ['pointer', 'int']],
		'Close': ['void', ['pointer', 'int']],
	});
	
	module.exports = {
		start: function(cb){
			global.demoStartCB = ffi.Callback('void', ['bool'], function(isStart){
				cb && cb(isStart);
			});
			demoLib.Start(global.demoStartCB);
		},

		stop: function(cb){
			global.demoStopCB = ffi.Callback('void', ['bool'], function(isStop){
				cb && cb(isStop);
			});
			demoLib.Stop(global.demoStopCB);
		},

		pause: function(cb){
			global.demoPauseCB = ffi.Callback('void', [stringPointer, 'int'], function(ip, length){
				cb && cb(ip, length);
			});
			demoLib.Pause(global.demoPauseCB);
		},

		close: function(cb){
			global.demoCloseCB = ffi.Callback('void', [stringPointer, 'int', 'string'], function(mac, length, sep){
				cb && cb(mac, length, sep);
			});
			demoLib.Pause(global.demoCloseCB);
		}
	}	
} catch (error) {
	module.exports = {
		start: function (cb) {
			cb && cb(false);
		}
	}
}

