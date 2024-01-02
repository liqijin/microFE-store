import store from '@/store'

function checkPermission (el, binding, vnode) {
  const { value } = binding
  const buttons = store.getters && store.getters.buttons

  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value

    const hasPermission = buttons.some(role => {
      return permissionRoles.includes(role)
    })
    if (!hasPermission) {
      vnode.context.$nextTick(() => {
        el.parentNode && el.parentNode.removeChild(el)
      })
    }
  } else {
    throw new Error('need roles! Like v-permission="[\'AddRole\',\'ModifyRole\']"')
  }
}

export default {
  inserted (el, binding, vnode) {
    checkPermission(el, binding, vnode)
  },
  update (el, binding, vnode) {
    checkPermission(el, binding, vnode)
  }
}
