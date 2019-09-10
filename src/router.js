import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/gsbx',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: () => import('@/views/ArticleDetail')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin'),
      redirect: '/admin/login',
      children: [
        {
          path: '/admin/login',
          name: 'adminLogin',
          component: () => import('@/views/Admin/Login')
        },
        {
          path: '/admin/home',
          name: 'adminHome',
          component: () => import('@/views/Admin/Home'),
          redirect: '/admin/home/workbench',
          children: [
            {
              path: '/admin/home/workbench',
              name: 'workbench',
              component: () => import('@/views/Admin/Workbench')
            },
            {
              path: '/admin/home/personal',
              name: 'personal',
              component: () => import('@/views/Admin/Personal')
            },
            {
              path: '/admin/home/writeArticle',
              name: 'writeArticle',
              component: () => import('@/views/Admin/WriteArticle')
            },
            {
              path: '/admin/home/articleUpdate',
              name: 'articleUpdate',
              component: () => import('@/views/Admin/ArticleUpdate')
            }
          ]
        }
      ]
    }
  ]
})
