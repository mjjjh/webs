import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/module',
      name: 'module',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ModuleView.vue')
    },
    //帖子
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostView.vue')
    },
    
    //分区

    {
      path: '/style/:type',
      name: 'real',
      component: () => import('../views/ContentView.vue')
    },
  ]
})

export default router
