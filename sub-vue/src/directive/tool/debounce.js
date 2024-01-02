// v-debounce="2000" 则2000ms内 该按钮不可点击
// 取指令值 number 默认1500
const debounce = {
  inserted (el, binding) {
    if (binding.value === 0) {
      return
    }
    const secound = binding.value || 1500
    el.addEventListener('click', e => {
      if (!el.disabled) {
        el.disabled = true
        el.style.cursor = 'not-allowed'
        setTimeout(() => {
          el.style.cursor = 'pointer'
          el.disabled = false
        }, secound)
      }
    })
  }
}

export default debounce
