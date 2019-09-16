export default {
  update: function (el, binding, vnode) {
    if (binding.value.directorys.length !== 0) {
      return
    }
    let directivesArr = []
    for (var i = 0; i < el.children.length; i++) {
      let item = el.children[i]
      if (item.tagName.indexOf('H') < 0) {
        continue
      }
      directivesArr.push({
        a_id: item.firstChild.id,
        level: item.tagName.substring(1),
        text: item.innerText
      })
    }
    binding.value.setDirectorys(directivesArr)
  }
}
