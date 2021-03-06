(function (global, name, factory) {
    "use strict"
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory(require('./lib/toast'))
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory)
    } else {
        global[name] = factory.apply(this);
    }
}(this, "vSharp", function (obj) {
    var params = {
        appVersion: navigator.appVersion,
        minAppVersion: navigator.appVersion.toLowerCase(),
    }

    var client = {
        IE: params.minAppVersion.indexOf('msie') > -1 && !params.minAppVersion.indexOf('opera') > -1,
        GECKO: params.minAppVersion.indexOf('gecko') > -1 && !params.minAppVersion.indexOf('khtml') > -1, // 火狐内核
        WEBKIT: params.minAppVersion.indexOf('applewebkit') > -1, // 苹果、谷歌内核
        OPERA: params.minAppVersion.indexOf('opera') > -1 && params.minAppVersion.indexOf('presto') > -1, // opera内核
        TRIDENT: params.minAppVersion.indexOf('trident') > -1, // IE内核
        MOBILE: !!params.appVersion.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        MOBILEDEVICE: !!params.minAppVersion.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
        IOS: !!params.appVersion.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        ANDROID: params.appVersion.indexOf('Android') > -1 || params.appVersion.indexOf('Adr') > -1, // android终端或者uc浏览器
        IPHONE: params.appVersion.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        IPAD: params.appVersion.indexOf('iPad') > -1, // 是否iPad
        // WEBAPP= !params.appVersion.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
        QQBROWSER: params.appVersion.indexOf('QQBrowser') > -1, // 是否QQ浏览器
        WEIXIN: params.appVersion.indexOf('MicroMessenger') > -1, // 是否微信
        QQ: params.appVersion.match(/\sQQ/i) === ' qq', // 是否QQ
    }

    var arrayEqual = function(arr1, arr2) {
        if (arr1 === arr2) return true;
        if (arr1.length != arr2.length) return false;
        for (var i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    var setLocal = function (key, val, expired) {
        if (['string', 'number'].indexOf((typeof key)) == -1) throw new Error('this key not string or number type, please check the key type')
        if (['object', 'function'].indexOf((typeof val)) > -1) {
            val = JSON.stringify(val)
        }
        var data = {
            value: val,
            expired: new Date().getTime() + (+expired || 30) * 24 * 60 * 60 * 1000
        }
        localStorage.setItem(key, JSON.stringify(data))
    }

    var getLocal = function (key) {
        var local = localStorage.getItem(key)
        if (local) {
            var obj = JSON.parse(local)
            var nowTime = new Date().getTime()
            var time = parseInt(nowTime - obj.expired) <= 0 ? true : false // true 没过期
            if (!time) throw new Error('this key is invalid or expired')
            return JSON.parse(obj.value)
        }
        return local
    }

    var delLocal = function (key) {
        localStorage.removeItem(key)
    }

    var delLocalMulti = function (arr) {
        var isArr = Object.prototype.toString.call(arr).indexOf('Array') > -1 ? true : false
        if (isArr) {
            arr.forEach(function (e, i) {
                localStorage.removeItem(e)
            })
        } else {
            throw new Error('this arr must array type')
        }
    }

    var setSession = function (key, val, expired) {
        if (['string', 'number'].indexOf((typeof key)) == -1) throw new Error('this key not string or number type, please check the key type')
        if (['object', 'function'].indexOf((typeof val)) > -1) {
            val = JSON.stringify(val)
        }
        var data = {
            value: val,
            expired: new Date().getTime() + (+expired || 30) * 24 * 60 * 60 * 1000
        }
        sessionStorage.setItem(key, JSON.stringify(data))
    }

    var getSession = function (key) {
        var local = sessionStorage.getItem(key)
        // if (local) {
            var obj = JSON.parse(local)
            // var nowTime = new Date().getTime()
            // var time = parseInt(nowTime - obj.expired) <= 0 ? true : false // true 没过期
            // if (!time) throw new Error('this key is invalid or expired')
            return JSON.parse(obj.value)
        // }
        // return local
    }

    var delSession = function (key) {
        sessionStorage.removeItem(key)
    }

    var delSessionMulti = function (arr) {
        var isArr = Object.prototype.toString.call(arr).indexOf('Array') > -1 ? true : false
        if (isArr) {
            arr.forEach(function (e, i) {
                sessionStorage.removeItem(e)
            })
        } else {
            throw new Error('this arr must array type')
        }
    }

    var throttle = function(delay, noTrailing, callback, debounceMode) {
        var timeoutID;
        var lastExec = 0;
        if (typeof noTrailing !== 'boolean') {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }
        function wrapper() {
            var self = this;
            var elapsed = Number(new Date()) - lastExec;
            var args = arguments;
            function exec() {
                lastExec = Number(new Date());
                callback.apply(self, args);
            }
            function clear() {
                timeoutID = undefined;
            }
            if (debounceMode && !timeoutID) {
                exec();
            }
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            if (debounceMode === undefined && elapsed > delay) {
                exec();
            } else if (noTrailing !== true) {
                timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
            }
        }
        return wrapper;
    };

    var debounce = function(delay, atBegin, callback) {
        return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
    };

    var isEmptyObject = function (obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return false
        return !Object.keys(obj).length
    }
    
    var deepClone = function (values) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == values || "object" != typeof values) return values;
        // Handle Date
        if (values instanceof Date) {
            copy = new Date();
            copy.setTime(values.getTime());
            return copy;
        }
        // Handle Array
        if (values instanceof Array) {
            copy = [];
            for (var i = 0, len = values.length; i < len; i++) {
                copy[i] = deepClone(values[i]);
            }
            return copy;
        }
        // Handle Object
        if (values instanceof Object) {
            copy = {};
            for (var attr in values) {
                if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy values! Its type isn't supported.");
    }

    return {
        params,
        client,
        arrayEqual,
        setLocal,
        getLocal,
        delLocal,
        delLocalMulti,
        setSession,
        getSession,
        delSession,
        delSessionMulti,
        throttle,
        debounce,
        isEmptyObject,
        Toast: obj.Toast.install,
    }

}));
