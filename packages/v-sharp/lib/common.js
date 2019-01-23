var Common = {
  backLayer: function () {
    var layer = document.createElement('div')
    layer.setAttribute('class', 'v-sharp-layer')
    document.body.appendChild(layer)
  }
}
module.exports = Common
