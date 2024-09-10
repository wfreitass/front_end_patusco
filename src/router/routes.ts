import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },
  {
    path: '/tipo-animal',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TipoAnimal/Main.vue') }],
  },
  {
    path: '/tipo-animal/form',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TipoAnimal/Form.vue') }],
  },
  {
    path: '/tipo-animal/form/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TipoAnimal/Form.vue') }],
  },

  //Animal
  {
    path: '/animal',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Animal/Main.vue') }],
  },
  {
    path: '/animal/form',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Animal/Form.vue') }],
  },
  {
    path: '/animal/form/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Animal/Form.vue') }],
  },

  //Consultas 
  {
    path: '/consultas',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Consultas/Main.vue') }],
  },
  {
    path: '/consulta/form',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Consultas/Form.vue') }],
  },
  {
    path: '/consulta/form/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Consultas/Form.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
