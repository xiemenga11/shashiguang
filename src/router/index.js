import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductShowcase from '../views/ProductShowcase.vue'
import ProductDetail from '../views/ProductDetail.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'ProductsDetail',
    component: ProductDetail
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: ProductShowcase
  },
  {
    path: '/catalog/:id',
    name: 'CatalogDetail',
    component: ProductDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
