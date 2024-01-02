import './public-path'
import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import routes from './router'
import { store as commonStore } from 'common'
import store from './store'
import '@/icons' // icon
import VueRouter from 'vue-router'
// ele弹窗组件再封装
import customDialog from '@/components/cust-dialog'
// element-ui
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import permission from '@/directive/permission' // 权限指令，按钮权限控制
import elDragDialog from '@/directive/el-drag-dialog' // element-ui 弹框拖拽
import tool from '@/directive/tool'

Vue.config.productionTip = false
let instance = null
// 全局修改 Dialog 默认配置，禁止点击 modal 关闭 Dialog
ElementUI.Dialog.props.closeOnClickModal.default = false // 自定义指令-工具

// 函数式弹窗
Vue.prototype.$dialog = customDialog
// 事件总线
Vue.prototype.$bus = new Vue()

Vue.use(ElementUI, { size: 'small' })

Vue.use(permission)
Vue.use(elDragDialog)
Vue.use(tool)

function render (props = {}) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

export async function bootstrap () {
  // console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  // console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
