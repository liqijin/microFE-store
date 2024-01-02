import Layout from '@/layout'

const asyncRoutes = {
  path: '/components',
  component: Layout,
  name: 'components',
  redirect: 'noRedirect',
  meta: {
    title: '组件库',
    icon: 'form'
  },
  children: [
    {
      path: 'buttons',
      component: () => import('@/views/style-modal/buttons/index'),
      meta: {
        title: '按钮组件',
        noCache: true
      },
      name: 'buttons'
    },
    {
      path: 'checkboxs',
      component: () => import('@/views/style-modal/checkboxs/index'),
      meta: {
        title: '复选框组件',
        noCache: true
      },
      name: 'checkboxs'
    },
    {
      path: 'inputs',
      component: () => import('@/views/style-modal/inputs/index'),
      meta: {
        title: '输入框组件',
        noCache: true
      },
      name: 'inputs'
    },
    {
      path: 'loaders',
      component: () => import('@/views/style-modal/loaders/index'),
      meta: {
        title: '加载组件',
        noCache: true
      },
      name: 'loaders'
    },
    {
      path: 'switchList',
      component: () => import('@/views/style-modal/switchs/index'),
      meta: {
        title: '开关组件',
        noCache: true
      },
      name: 'switchList'
    },
    {
      path: 'others',
      component: () => import('@/views/style-modal/others/index'),
      meta: {
        title: '其他创想',
        noCache: true
      },
      name: 'others'
    },
    {
      path: 'scrollLoad',
      component: () => import('@/views/style-modal/scroll-load/index'),
      meta: {
        title: '无限滚动',
        noCache: true
      },
      name: 'scrollLoad'
    },
    {
      path: 'btnHover',
      component: () => import('@/views/style-modal/btn-style/index'),
      meta: {
        title: '按钮效果',
        noCache: true
      },
      name: 'btnHover'
    },
    {
      path: 'textLinkHover',
      component: () => import('@/views/style-modal/text-link-hover/index'),
      meta: {
        title: '文字效果',
        noCache: true
      },
      name: 'textLinkHover'
    }
  ]
}

export default asyncRoutes
