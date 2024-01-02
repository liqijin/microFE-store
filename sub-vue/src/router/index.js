import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

import asyncRoutes from './model/asyncRoutes.js'
import exampleRoutes from './model/example.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  },
  asyncRoutes,
  exampleRoutes,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  {
    path: '/svg',
    name: 'svgPage',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: 'SVG', icon: 'skill' },
    children: [
      {
        path: 'svg-view',
        component: () => import('@/views/svg-pages/index'),
        name: 'svgView',
        meta: { title: 'SVG' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default routes
