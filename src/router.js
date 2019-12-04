import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      component: () => import(/* webpackChunkName: 'main' */ './views/Main.vue'),
      children: [
        {
          path:'/',
          name: 'RouteGaurd',
          beforeEnter: (to, from, next) => {
            const user = store.getters.user;
            if(user){
              return next('/events');
            }
            next();
          }
        },
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
        },
        {
          path:'/news-feed/',
          name:'news-feed',
          component: () => import(/* webpackChunkName: 'main' */ './views/NewsFeed.vue')
        },
        {
          path:'/new-feed/',
          name:'new-feed',
          component: () => import(/* webpackChunkName: 'main' */ './views/NewFeed.vue')
        },
        {
          path:'/edit-feed/:messageKey',
          name:'edit-feed',
          component: () => import(/* webpackChunkName: 'main' */ './views/NewFeed.vue')
        },
        {
          path: '/dev',
          name: 'dev',
          component: () => import(/* webpackChunkName: 'main' */ './views/DevArea.vue')
        }

      ]
    }
  ]
})
