import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Report from '@/views/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    }
  ]
})
