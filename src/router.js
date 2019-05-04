import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'main',
      component: () => import(/* webpackChunkName: 'main' */ './views/Main.vue'),
      children: [
        {
          path:'/events',
          name:'events-table',
          component: () => import(/* webpackChunkName: 'main' */ './views/EventsTable.vue')
        },
        {
          path:'/event/',
          name:'new-event',
          component: () => import(/* webpackChunkName: 'main' */ './views/EditEvent.vue')
        },
        {
          path:'/event/:id',
          name:'edit-event',
          component: () => import(/* webpackChunkName: 'main' */ './views/EditEvent.vue')
        }
      ]
    }
  ]
})
