var Common = {
  backLayer: function (time) {
    var layer = document.createElement('div')
    layer.setAttribute('class', 'v-sharp-layer')
    document.body.appendChild(layer)
    document.body.style.cssText = 'overflow: hidden'
    setTimeout(function(){
      document.body.style.cssText = 'overflow: \'\''
    }, time)
  }
}
module.exports = Common
