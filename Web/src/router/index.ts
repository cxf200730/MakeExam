import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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

export default router
