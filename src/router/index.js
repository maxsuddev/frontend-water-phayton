import { createRouter, createWebHistory } from 'vue-router';
import {
  RoleView,
  UserView,
  SizeView,
  StockView,
  LoginView,
  ClientView,
  ProductView,
  CategoryView,
  SupplierView,
  DashboardView,
  ImportInvoiceView,
  ExportInvoiceView,
  ClientProfileView,
  ProductVariantView,
  StockMovementView,

} from '@/views/index.js';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  // user pages
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: { requiresAuth: true },
  },
  {
    path: '/role',
    name: 'role',
    component: RoleView,
    meta: { requiresAuth: true },
  },
    //product pages
  {
    path: '/category',
    name: 'category',
    component: CategoryView,
    meta: { requiresAuth: true },
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView,
    meta: { requiresAuth: true },
  },
  {
    path: '/size',
    name: 'size',
    component: SizeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/product-variant',
    name: 'product-variant',
    component: ProductVariantView,
    meta: { requiresAuth: true },
  },
//import pages
  {
    path: '/supplier',
    name: 'supplier',
    component: SupplierView,
    meta: { requiresAuth: true },
  },
  {
    path: '/stock',
    name: 'stock',
    component: StockView,
    meta: { requiresAuth: true },
  },
  {
    path: '/stock-movement',
    name: 'stock-movement',
    component: StockMovementView,
    meta: { requiresAuth: true },
  },
  {
    path: '/import-invoice',
    name: 'import-invoice',
    component: ImportInvoiceView,
    meta: { requiresAuth: true },
  },

    //export pages

  {
    path: '/client',
    name: 'client',
    component: ClientView,
    meta: { requiresAuth: true },
  },
  {
    path: '/client/:clientId',
    name: 'clientProfile',
    component: ClientProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/export-invoice',
    name: 'export-invoice',
    component: ExportInvoiceView,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
