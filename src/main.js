import Vue from 'vue'
import App from './App.vue'

import Navbar from './components/Navbar.vue'
import Sidenav from './components/Sidenav.vue'
// import EventsTable from './components/content/EventsTable.vue'
import router from './router'
import store from './store'

import './assets/scss/style.scss';


Vue.config.productionTip = false

// componenets
Vue.component('app-navbar', Navbar);
Vue.component('app-sidenav', Sidenav);
// Vue.component('EventsTable', EventsTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
