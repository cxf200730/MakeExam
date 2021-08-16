import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },{
    path: '/login',
    name: 'Login',
    component: () => import( '../views/LoginRegiste.vue')
  },
  {
    path: '/myexam',
    name: 'Myexam',
    component: () => import( '../views/myexam.vue')
  },
  {
    path: '/exam',
    name: 'Exam',
    component: () => import( '../views/exam.vue')
  },
  {
    path: '/make',
    name: 'Make',
    component: () => import( '../views/make.vue')
  },
  {
    path: '/doexam',
    name: 'DoExam',
    component: () => import( '../views/doexam.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import( '../views/result.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import( '../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const make_phone = localStorage.getItem('make_phone')

  // 缓存中有昵称
  if (make_phone) {
    // 当前是登录页
    if (to.path === '/login') {
      next({ path: '/myexam' })
    } else {
      next()
    }
  } else {
    // 当前是登录页
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
export default router
