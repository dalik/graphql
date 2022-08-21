import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export enum Routes {
  Home = 'Home',
  Category = 'Category',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Routes.Home,
    component: () => import('./views/Home.vue')
  },
  {
    path: '/category/:categoryId',
    name: Routes.Category,
    component: () => import('./views/Category.vue'),
    props: true
  }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})