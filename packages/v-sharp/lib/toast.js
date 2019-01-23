var Common = require('./common')
var Toast = {}
Toast.install = function (Vue, options) {
    console.log(options)
    // 1. 添加全局方法或属性
    // Vue.myGlobalMethod = function () {
    // 逻辑...
    // }

    // 2. 添加全局资源
    // Vue.directive('my-directive', {
    //     bind (el, binding, vnode, oldVnode) {
    // 逻辑...
    // },
    // })

    // 3. 注入组件
    // Vue.mixin({
    //     created: function () {
    // 逻辑...
    // },
    // })

    // 4. 添加实例方法
    let opt = {
        defaultType: 'bottom',   // 默认显示位置
        duration: '2500'         // 持续时间
    }
    for (let property in options) {
        opt[property] = options[property]  // 使用 options 的配置
    }
    Vue.prototype.$$toast = (tips, type) => {
        if (type) {
            opt.defaultType = type // 如果有传type，位置则设为该type
        }
        if (document.getElementsByClassName('vSharpToast').length) {
            // 如果toast还在，则不再执行
            return
        }
        let toastTpl = Vue.extend({
            template: '<div class="vSharpToast toast-' + opt.defaultType + '">' + tips + '</div>'
        })
        let tpl = new toastTpl().$mount().$el
        Common.backLayer()
        document.body.appendChild(tpl)
        setTimeout(function () {
            // document.body.removeClild(tpl)
        }, 2500)
    }
    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$$toast[type] = (tips) => {
            return Vue.prototype.$$toast(tips, type)
        }
    })
}
module.exports = Toast
