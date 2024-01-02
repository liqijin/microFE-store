const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

/**
  @author qi
  @descb v-decimal.d2 则输入框只能输入正两位小数 以此类推, 只写v-decimal则取正整数
**/
export default {
  bind: function (el, binding, vnode) {
    // 正则规则可根据需求自定义
    // macth方法查找符合要求的 不能使用已有正则 因开头无^
    // /^-[0-9]\d*\+?[0-9]\d*$/
    const regMap = {
      d2: /^(-)?(\d+(\.?\d{0,2}))?/, // 两位小数正负
      zd2: /\d+(\.?\d{0,2})/, // 正两位小数
      zd1: /\d+(\.?\d{0,1})/, // 正一位小数
      z: /\d{0,12}/, // 正数 max 12位
      z2: /\d{0,20}/, // 正数 max 20位
      z180: /^(?:[1-9]\d?|1[0-7]\d|180)$/, // 正整数 大于0小于等于180
      z999: /^(?:[1-9]\d?|1[0-7]\d|999)$/, // 正整数 大于0小于等于999
      zz: /^[0-9]*[0-9][0-9]*$/, // 正整数，包含零
      zz2: /^-?[0-9]*$/, // 正负整数，包含零
      d2f: /^([1-9][0-9]*(\.[0-9]+)?|0{1}\.[0-9]*[1-9][0-9]*)$/ // 不以零开头的数字，可使用以零开头的小数
    }
    var type = 'z'
    const rks = Object.keys(regMap)
    for (let i = 0; i < rks.length; i++) {
      const k = rks[i]
      if (binding.modifiers[k]) {
        type = k
        break
      }
    }
    var regRule = regMap[type]
    const $inp = findEle(el, 'input')
    el.$inp = $inp

    let inputLock = false
    $inp.addEventListener('compositionstart', function () {
      inputLock = true
    })
    $inp.addEventListener('compositionend', function () {
      inputLock = false
    })

    $inp.handle = function () {
      try {
        if (inputLock) {
          return
        }
        const val = $inp.value
        const matchedStrs = (val.match(regRule) && val.match(regRule).filter(t => t)) || []
        $inp.value = matchedStrs[0] || ''
        trigger($inp, 'input') // trigger input event by handle, later
      } catch (error) {
        console.error('error', error)
      }
    }

    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind: function (el) {
    if (el) el.$inp.removeEventListener('keyup', el.$inp.handle)
  }
}
