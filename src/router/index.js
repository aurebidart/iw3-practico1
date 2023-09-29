// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/details/:id', // Ruta dinámica con un parámetro llamado "id"
        name: 'ProductDetails', // Nombre de la ruta
        component: () => import(/* webpackChunkName: "product-details" */ '@/views/ProductDetails.vue'),
      },
      {
        path: '/new-sell',
        name: 'NewSell',
        component: () => import(/* webpackChunkName: "new-sell" */ '@/views/NewSell.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
