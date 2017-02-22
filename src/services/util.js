
class Util {
  updateAttrFromTo (Vue, from, to, attr, defVal) { // to是待被更改的数组, from是标准数组
    if (!(from instanceof Array) || !(to instanceof Array)) return []
    for (let i = 0; i < to.length; i++) {
      let change = from.findIndex(function (item) {
        return to[i].hash === item.hash
      })
      if (change !== -1 && to[i] && from[i]) to[i][attr] = from[i][attr]
      else if (to[i]) to[i][attr] = defVal
      Vue.set(to, i, to[i])
    }
    return to
  }
  updateAttrByHash (Vue, hash, to, attr, val) {
    if (!(to instanceof Array)) return
    for (let i = 0; i < to.length; i++) {
      if (to[i].hash === hash) {
        to[i][attr] = val
        Vue.set(to, i, to[i])
        return
      }
    }
  }
  setAttrToItem (Vue, from, item, attr) {
    if (!(from instanceof Array)) return
    for (let i = 0; i < from.length; i++) {
      if (from[i].hash === item.hash) {
        item[attr] = from[i][attr]
        break
      }
    }
  }
}

let exportInstance = new Util()

export default exportInstance
