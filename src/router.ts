import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import MarketView from './views/MarketView.vue'
import AddCardView from './views/AddCardView.vue'
import RankingView from './views/RankingView.vue'
import ProfileView from './views/ProfileView.vue'
import CardDetailView from './views/CardDetailView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import { useAuthStore } from './composables/useAuthStore'
import { useAdminStore } from './composables/useAdminStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/cards' },
    { path: '/login', name: 'login', component: LoginView, meta: { hideTabbar: true, guestOnly: true } },
    { path: '/register', name: 'register', component: RegisterView, meta: { hideTabbar: true, guestOnly: true } },
    { path: '/cards', name: 'cards', component: HomeView },
    { path: '/market', name: 'market', component: MarketView },
    { path: '/add', name: 'add', component: AddCardView },
    { path: '/ranking', name: 'ranking', component: RankingView },
    { path: '/profile', name: 'profile', component: ProfileView },
    {
      path: '/admin',
      redirect: '/admin/cards',
      meta: { hideTabbar: true, adminShell: true, adminRequiresAuth: true }
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('./views/AdminLoginView.vue'),
      meta: { hideTabbar: true, adminShell: true, adminGuestOnly: true }
    },
    {
      path: '/admin/cards',
      name: 'admin-cards',
      component: () => import('./views/AdminCardsView.vue'),
      meta: { hideTabbar: true, adminShell: true, adminRequiresAuth: true }
    },
    {
      path: '/admin/cards/new',
      name: 'admin-card-new',
      component: () => import('./views/AdminCardEditView.vue'),
      meta: { hideTabbar: true, adminShell: true, adminRequiresAuth: true }
    },
    {
      path: '/admin/cards/:id/edit',
      name: 'admin-card-edit',
      component: () => import('./views/AdminCardEditView.vue'),
      meta: { hideTabbar: true, adminShell: true, adminRequiresAuth: true }
    },
    {
      path: '/admin/drafts',
      name: 'admin-drafts',
      component: () => import('./views/AdminDraftsView.vue'),
      meta: { hideTabbar: true, adminShell: true, adminRequiresAuth: true }
    },
    {
      path: '/card/:id',
      name: 'card-detail',
      component: CardDetailView,
      meta: { hideTabbar: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuthStore()
  const { isAdminAuthenticated } = useAdminStore()
  const redirect = typeof to.query.redirect === 'string' && to.query.redirect.startsWith('/') ? to.query.redirect : '/cards'
  const adminRedirect =
    typeof to.query.redirect === 'string' && to.query.redirect.startsWith('/admin') ? to.query.redirect : '/admin/cards'

  if (to.meta.guestOnly && isAuthenticated.value) {
    return redirect
  }

  if (to.meta.adminGuestOnly && isAdminAuthenticated.value) {
    return adminRedirect
  }

  if (to.meta.adminRequiresAuth && !isAdminAuthenticated.value) {
    return {
      path: '/admin/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
