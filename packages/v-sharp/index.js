class checkEnvironment {
    /**
     * @param platform      平台
     * @param version       版本号
     */
    constructor(platform, version) {
        this.platform = platform
        this.version = version
        this.client()
    }

    client() {
        let appVersion = navigator.appVersion
        let minAppVersion = appVersion.toLowerCase()
        this.IE = minAppVersion.indexOf('msie') > -1 && !minAppVersion.indexOf('opera') > -1
        this.GECKO = minAppVersion.indexOf('gecko') > -1 && !minAppVersion.indexOf('khtml') > -1 // 火狐内核
        this.WEBKIT = minAppVersion.indexOf('applewebkit') > -1 // 苹果、谷歌内核
        this.OPERA = minAppVersion.indexOf('opera') > -1 && minAppVersion.indexOf('presto') > -1 // opera内核
        this.TRIDENT = minAppVersion.indexOf('trident') > -1 // IE内核
        this.MOBILE = !!appVersion.match(/AppleWebKit.*Mobile.*/) // 是否为移动终端
        this.MOBILEDEVICE = !!minAppVersion.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i) // 是否为移动终端
        this.IOS = !!appVersion.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        this.ANDROID = appVersion.indexOf('Android') > -1 || appVersion.indexOf('Adr') > -1 // android终端或者uc浏览器
        this.IPHONE = appVersion.indexOf('iPhone') > -1 // 是否为iPhone或者QQHD浏览器
        this.IPAD = appVersion.indexOf('iPad') > -1 // 是否iPad
        // WEBAPP= !appVersion.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
        this.QQBROWSER = appVersion.indexOf('QQBrowser') > -1 // 是否QQ浏览器
        this.WEIXIN = appVersion.indexOf('MicroMessenger') > -1 // 是否微信
        this.QQ = appVersion.match(/\sQQ/i) === ' qq' // 是否QQ
    }


}

module.exports = {
    checkEnvironment: checkEnvironment
}
