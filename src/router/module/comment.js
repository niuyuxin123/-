// import List from '@/views/comment/List.vue'
// import Index from '@/views/comment/Index.vue'
const comment = [
  {
    path:'comment',
    name:'comment',
    meta:{
      menu:'微信'
    },
    components: {
      left:()=>import('@/views/comment/List.vue'),
      right:()=>import('@/views/comment/Index.vue')
      // left:List,
      // right:Index
    }
  }

]
export default comment
