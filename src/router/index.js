import { createRouter, createWebHashHistory } from "vue-router";
const index = () => import('/src/pages/index.vue');
const home = () => import('/src/pages/home.vue');
const lostPage = () => import('/src/pages/404.vue');

const study = () => import('/src/pages/pioneer/study.vue');

const routes = [
  {
    path: '/',
    component: index,
    children: [
      { path: '/', name: 'home', component: home },
    ],
  },
  {
    path: '/404',
    component: lostPage,
  },
  {
    path: '/pioneer',
    name: '一级菜单',
    component: index,
    children: [
      { path: 'study', name: '二级菜单', component: study },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})


export default router
