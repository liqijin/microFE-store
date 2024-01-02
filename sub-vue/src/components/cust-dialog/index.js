import Dialog from './dialog.vue'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'
import { getMaxZIndex } from '@/utils'

const noop = () => {}
let dialogInstance = null

// 挂载Dialog并获得实例
const newInstance = properties => {
  const props = properties || {}
  const Instance = new Vue({
    data: props,
    store, // '因为dialog是全局组件, 挂载在body尾部, 与任何组件没有父子兄弟关系, 需要重新引入sotre, router'
    router,
    render: h =>
      h(Dialog, {
        props
      })
  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  return Instance.$children[0]
}
// 全局只有一个实例, 每次invoke的时候只是在更换functionalComponent的内容,且返回新的promise(pending态)
const getDialogInstance = () => {
  dialogInstance = dialogInstance || newInstance()
  return dialogInstance
}

export default {
  invoke ({
    title = '',
    render = noop,
    close = noop,
    open = noop,
    params = {},
    closeOnClickModal = false,
    customClass = 'global_dialog',
    width = '50%',
    showClose = true,
    plain = false
  } = {}) {
    const ins = getDialogInstance()
    ins.$el.style.zIndex = getMaxZIndex() + 10
    return ins.invoke({ title, render, open, close, params, width, customClass, closeOnClickModal, showClose, plain })
  },
  hide () {
    getDialogInstance().hide()
  },
  resolve (v) {
    getDialogInstance().resolve(v)
  },
  reject (err) {
    getDialogInstance().reject(err)
  },
  resolver: () => getDialogInstance().resolver()
}
