import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/store/index"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/default/Default.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/HomePage.vue')
        },
        {
          path: '/add',
          name: 'Add',
          component: () => import('@/views/ShopViews/AddPage.vue')
        },
        {
          path: '/edit/:id',
          name: 'Edit',
          component: () => import('@/views/ShopViews/EditPage.vue')
        },
        {
          path: '/report',
          name: 'Report',
          component: () => import('@/views/ShopViews/Report.vue')
        },
        {
          path: '/manage-order',
          name: 'ManagerOrder',
          component: () => import('@/views/ShopViews/ManageOrder.vue')
        },
        {
          path: '/manage-order/:id',
          name: 'EditManagerOrder',
          component: () => import('@/views/ShopViews/EditManageOrder.vue')
        },

        // Auth
        {
          "path": "/login",
          "name": "Login",
          component: () => import('@/views/Auth/LoginPage.vue')
        },
        {
          "path": "/signup",
          "name": "SignUp",
          component: () => import('@/views/Auth/SignUpPage.vue')
        },
        {
          "path": "/setting",
          "name": "Setting",
          component: () => import('@/views/Auth/SettingPage.vue')
        }
      ]
    },
  ]
})

router.beforeEach(async (to) => {

  const publicPages = ['/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const auth = useUserStore()
  const data = JSON.parse(localStorage.getItem('user')!)

  if (data) auth.user.full_name = data.full_name

  if (authRequired && !auth.user.full_name) {
    return '/login'
  }

})

export default router
