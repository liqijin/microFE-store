import decimal from './decimal'
import debounce from './debounce'
import outSide from './outSide'

// 自定义指令
const directives = {
  decimal,
  debounce,
  outSide
}

export default {
  install (Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}
