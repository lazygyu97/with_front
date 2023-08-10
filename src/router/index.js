import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from '@/axios/axios-instance';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true},
    children: [

      { path: '/board',   component: () => import( '../views/BoardView.vue') },
      { path: '/user',   component: () => import( '../views/UserView.vue') },

    ]
  },
  {
    path: '/board',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 토큰 유효성 검사 로직 구현
    try {
      await axios.get("users")
          .then(response => {
            window.localStorage.setItem('username', response.data.username);
            window.localStorage.setItem('userImage', response.data.userImage);
            next();
          })
    } catch (error){
      console.log(error);
      next('/login');
      alert("로그인이 필요합니다.")
    }
  } else {
    next();
  }
});

export default router
