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
    path: '/oauth2',
    name: 'oauth2',
    component: () => import('../views/OAuth2.vue')
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
  },
  {
    path: '/board',
    name: 'board',
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
      await axios.get("/users")
          .then(response => {
            console.log(response)
            window.localStorage.setItem('username', response.data.username);
            window.localStorage.setItem('userImage', response.data.image);
            next();
          })
    } catch (error){

      console.log(error);
      alert("로그인이 필요합니다.")
      window.location.href = '/';
    }
  } else {
    next();
  }
});

export default router
