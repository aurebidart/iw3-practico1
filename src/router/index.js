// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Productos',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Productos.vue'),
      },
      {
        path: '/details/:id', // Ruta dinámica con un parámetro llamado "id"
        name: 'ProductDetails', // Nombre de la ruta
        component: () => import(/* webpackChunkName: "product-details" */ '@/views/ProductDetails.vue'),
      },
      {
        path: '/new-sell',
        name: 'NewSell',
        component: () => import(/* webpackChunkName: "new-sell" */ '@/views/SellsHistory.vue'),
      },
      {
        path: '/sells-history',
        name: 'SellsHistory',
        component: () => import(/* webpackChunkName: "new-sell" */ '@/views/SellsHistory.vue'),
      },
      {
        path: '/add-product',
        name: 'AddProduct',
        component: () => import(/* webpackChunkName: "new-sell" */ '@/views/AddProduct.vue'),
      },
      {
        path: 'accountancy',
        name: 'Contaduria',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Accountancy.vue'),
      },
      

    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
