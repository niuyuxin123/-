import Vue from 'vue'
import Router from 'vue-router'
import comment from './module/comment'
Vue.use(Router)
const addRouter = [
  ...comment
]
const router =new Router({
  routes:[
    {
      path:'/',
      redirect:'/login',
      children:[],
    },
    {
      path:'/login',
      name:'login',
      meta:{
        menu:'登录'
      },
      component:()=>import('@/views/entryDir/Login.vue')
    },
    {
      path:'/home',
      name:'home',
      meta:{
        menu:'主界面'
      },
      component:()=>import('@/views/layout/Index.vue'),
      children:addRouter
    }
  ]
})

export default router