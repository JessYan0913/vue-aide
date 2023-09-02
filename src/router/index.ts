import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

import { useRouterCache } from '../hooks/useRouterCache';

export const routes: RouteRecordRaw[] = [
  {
    path: '/edit-table',
    name: 'EditTable',
    component: () => import('../views/edit-table/index.vue'),
  },
  {
    path: '/grid-list',
    name: 'GridList',
    component: () => import('../views/grid-list/index.vue'),
  },
  {
    path: '/command-dialog',
    name: 'CommandDialog',
    component: () => import('../views/command-dialog/index.vue'),
  },
  {
    path: '/hotkey',
    name: 'HotKey',
    component: () => import('../views/hot-key/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../layout/index.vue'),
      children: routes,
    },
  ],
});

const { cacheRouter } = useRouterCache();
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  console.log('=====', to.path);

  cacheRouter(from, to);
  next();
});

export default router;
