import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../404/NotFound'
import HomePage from '../pages/home-page/index.vue';
import musicPlayer from '../pages/music-player';
import countDown from '../pages/count-down';
import luckDraw from '../pages/luck-draw'

Vue.use(VueRouter)

// 解决使用 push跳转 错误：未捕获（承诺中）导航复制：避免到当前位置的冗余导航
const routerRePush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return routerRePush.call(this, location).catch(error => error)
}

const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',   // home:userName
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'homepage',
        name: 'home-page',
        component: HomePage
      },
      {
        path: 'order',
        name: 'order-manage',
        component: () => import('../pages/order-manage'),
        children: [
          {
            path: 'list',
            name: 'order-list',
            component: () => import('../pages/order-manage/order-list')
          },
          {
            path: 'product',
            name: 'product-manage',
            component: () => import('../pages/order-manage/product-manage'), children: [
              {
                path: 'list',
                name: 'product-list',
                component: () => import('../pages/order-manage/product-manage/production-list')
              }, {
                path: 'review',
                name: 'review-manage',
                component: () => import('../pages/order-manage/product-manage/review-manage')
              }
            ]
          }, {
            path: 'returnGoods',
            name: 'return-goods',
            component: () => import('../pages/order-manage/return-goods')
          },
        ]
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../pages/goods-manage'), 
        children: [
          {
            path: 'list',
            name: 'goods-list',
            component: () => import('../pages/goods-manage/goods-list')
          },
          {
            path: 'classify',
            name: 'goods-classify',
            component: () => import('../pages/goods-manage/goods-classify')
          }
        ]
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('../pages/permission'),
        children: [
          {
            path: 'user',
            name: 'user-manage',
            component: () => import('../pages/permission/user-manage'),
            meta:{
              // 加入未登录黑名单
              requiresAuth:true,
            },
          },
          {
            path: 'role',
            name: 'role-manage',
            component: () => import('../pages/permission/role-manage'),
            meta:{
              // 加入未登录黑名单
              requiresAuth:true,
            },
          },
          {
            path: 'menu',
            name: 'menu-manage',
            components:{
              //路由命名视图 命名的视图 放在默认视图输出那一个组件中
              default:() => import('../pages/permission/menu-manage'),
              main: ()=>import('../components/namedView/main.vue'),
              sideBar: ()=>import('../components/namedView/sideBar.vue'),
            },
            meta:{
              // 加入未登录黑名单
              requiresAuth:true,
            }, 
          }
        ]
      },
      {
        path: 'player',
        name: 'music-player',
        component:musicPlayer,
        meta:{
          // 加入未登录黑名单
          requiresAuth:true,
        }
      },
      {
        path: 'countDown',
        name: 'count-down',
        component: countDown,
        meta:{
          // 加入未登录黑名单
          requiresAuth:true,
        },
      },
      { 
        path: 'luckDraw',
        name: 'luck-draw',
        component: luckDraw ,
        meta:{
          // 加入未登录黑名单
          requiresAuth:true,
        },
        children: [
          { 
            path: 'luckDrawOne',
            name: 'luckOne',
            component: () => import('../pages/luck-draw/one'),
          },
          {
            path: 'luckDrawTwo',
            name: 'luckTwo',
            component: () => import('../pages/luck-draw/two'),
          }
        ]
      },
    ]
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局配置路由守卫
router.beforeEach((to,from,next)=>{
   if(to.matched.some(record=>record.meta.requiresAuth)){
      if(!localStorage.getItem('user')){
          next({
            path:'/login',
            query:{
              redirect: to.fullPath
            }
          })
      }else{
        next();
      }
   }
   next()
})


// router.beforeEach((to,from,next)=>{
//   if(to.name==='music-player'||to.name==='count-down'||to.name==='luck-draw'){
//      if(!localStorage.getItem('user')){
//          next({path:'/login'})
//      }else{
//        next();
//      }
//   }
//   next()
// })


export default router
