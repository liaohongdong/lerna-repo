(function (global, name, factory) {
    "use strict"
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global[name] = factory.apply(this);
    }
}(this, "vSharp", function () {
    var params = {
        appVersion: navigator.appVersion,
        minAppVersion: appVersion.toLowerCase(),
    }

    var client = {
        IE: minAppVersion.indexOf('msie') > -1 && !minAppVersion.indexOf('opera') > -1,
        GECKO: minAppVersion.indexOf('gecko') > -1 && !minAppVersion.indexOf('khtml') > -1, // 火狐内核
        WEBKIT: minAppVersion.indexOf('applewebkit') > -1, // 苹果、谷歌内核
        OPERA: minAppVersion.indexOf('opera') > -1 && minAppVersion.indexOf('presto') > -1, // opera内核
        TRIDENT: minAppVersion.indexOf('trident') > -1, // IE内核
        MOBILE: !!appVersion.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        MOBILEDEVICE: !!minAppVersion.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
        IOS: !!appVersion.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        ANDROID: appVersion.indexOf('Android') > -1 || appVersion.indexOf('Adr') > -1, // android终端或者uc浏览器
        IPHONE: appVersion.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        IPAD: appVersion.indexOf('iPad') > -1, // 是否iPad
        // WEBAPP= !appVersion.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
        QQBROWSER: appVersion.indexOf('QQBrowser') > -1, // 是否QQ浏览器
        WEIXIN: appVersion.indexOf('MicroMessenger') > -1, // 是否微信
        QQ: appVersion.match(/\sQQ/i) === ' qq', // 是否QQ
    }

    return {
        params,
        client,
    }

}));
