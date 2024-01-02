import Layout from '@/layout'

const exampleRoutes = {
  path: '/example',
  component: Layout,
  name: 'example',
  redirect: 'noRedirect',
  meta: {
    title: '示例',
    icon: 'nested'
  },
  children: [
    {
      path: 'sheep-games',
      component: () => import('@/views/example/sheep-games/index'),
      meta: {
        title: '羊羊游戏',
        noCache: true
      },
      name: 'sheepGame'
    },
    {
      path: 'fold-in-effect',
      component: () => import('@/views/example/fold-in-effect/index'),
      meta: {
        title: '杂志折叠',
        noCache: true
      },
      name: 'effect'
    },
    {
      path: 'anchor',
      component: () => import('@/views/example/anchor-position/index'),
      meta: {
        title: '锚点定位',
        noCache: true
      },
      name: 'anchor'
    },
    {
      path: 'frosted-glass',
      component: () => import('@/views/example/frosted-glass/index'),
      meta: {
        title: '毛玻璃效果',
        noCache: true
      },
      name: 'frosted-glass'
    },
    {
      path: 'emoji-jump',
      component: () => import('@/views/example/emoji-jump/index'),
      meta: {
        title: '表情切换',
        noCache: true
      },
      name: 'emoji-jump'
    },
    {
      path: 'flex-item-fall-down',
      component: () => import('@/views/example/flex-item-fall-down/index'),
      meta: {
        title: '卡片堆叠',
        noCache: true
      },
      name: 'flex-item-fall-down'
    }
  ]
}

export default exampleRoutes
