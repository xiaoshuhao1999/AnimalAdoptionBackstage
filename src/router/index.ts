import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue');
const LoginPage = () => import('../views/LoginPage/index.vue');
const NotFound = () => import('../views/NotFound/index.vue');
const SettingsPage = () => import('../views/Settings/index.vue');
const DashBoardPage = () => import('../views/DashBoard/index.vue');
const UserState = () => import('../views/UserManagement/userState.vue');
const ResetPassword = () => import('../views/UserManagement/resetPassword.vue');
const DynamicManagement = () => import('../views/DynamicManagement/index.vue');
const DynamicState = () => import('../views/DynamicManagement/dynamicState.vue');
const UserManagement = () => import('../views/UserManagement/index.vue');
const SystemInforms = () => import('../views/SystemInforms/index.vue');
const AdoptInformation = () => import('../views/AdoptInformation/index.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: '首页',
        icon: 'home',
        isAuth: true,
      },
      component: HomeView,
      children: [
        {
          path: '/dashboard',
          name: 'dash_home',
          meta: {
            title: '面板',
            icon: 'about',
            isAuth: true,
          },
          component: DashBoardPage
        },
        {
          path: 'userManagement',
          name: 'UserManagement',
          meta: {
            title: '用户管理',
            icon: 'about',
            isAuth: true,
          },
          component:UserManagement,
          children:[
            {
              path: '',
              name: 'UserState2',
              meta: {
                title: '状态管理',
                icon: 'about',
                isAuth: true,
              },
              component:UserState,
            },
            {
              path: 'state',
              name: 'UserState',
              meta: {
                title: '状态管理',
                icon: 'about',
                isAuth: true,
              },
              component: UserState
            },
            {
              path: 'resetPassword',
              name: 'ResetPassword',
              meta: {
                title: '密码重置',
                icon: 'about',
                isAuth: true,
              },
              component: ResetPassword
            },
          ]
        },
        {
          path: 'dynamicManagement',
          name: 'DynamicManagement',
          meta: {
            title: '动态管理',
            icon: 'about',
            isAuth: true,
          },
          component:DynamicManagement,
          children:[
            {
              path: '',
              name: 'DynamicState',
              meta: {
                title: '状态管理',
                icon: 'about',
                isAuth: true,
              },
              component: DynamicState
            },
            {
              path: 'state',
              name: 'DynamicState',
              meta: {
                title: '状态管理',
                icon: 'about',
                isAuth: true,
              },
              component: DynamicState
            },
          ]
        },
        {
          path: 'systemInforms',
          name: 'SystemInforms',
          meta: {
            title: '系统通知',
            icon: 'about',
            isAuth: true,
          },
          component: SystemInforms
        },
        {
          path: 'adoptInformation',
          name: 'AdoptInformation',
          meta: {
            title: '领养信息',
            icon: 'about',
            isAuth: true,
          },
          component: AdoptInformation
        },
        {
          path: 'settings',
          name: 'settings',
          meta: {
            title: '设置',
            icon: 'about',
            isAuth: true,
          },
          component: SettingsPage
        },
      ]
    },
    {
      path: '/notFound',
      name: 'notFound',
      meta: {
        title: '找不到页面啦~',
        isAuth: false,
      },
      component: NotFound
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录页面',
        isAuth: false,
      },
      component: LoginPage
    },
    // 如果路由不存在则跳转 404
    {
      path: '/:pathMatch(.*)',
      name: 'ErrorPage',
      meta: {
        title: '找不到页面啦~',
        isAuth: false,
      },
      redirect:'/notFound'
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.name);
  
  // 判断前往的路由是否存在
  // if (router.hasRoute(to.name!)) {
    // 判断是否需要token验证
    if (to.meta.isAuth) {
      const token: string | null = localStorage.getItem('token');
      // 如果token不存在 则跳转登录页面
      if (!token && to.path !== '/login') return next({ path: '/login', query: { redirect: to.fullPath } });
      next();
    } else {
      next();
    }
  // } else {
  //   next('/notFound')
  // }
})


export default router
