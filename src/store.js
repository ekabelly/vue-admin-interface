import Vue from 'vue'
import Vuex from 'vuex'
import eventsService from './services/events-service';
import constants from './config/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    async fetchEvents(){
      const res = await eventsService.fetchEvents();
      if(res && res.status === constants.successStatus){
        return res.data;
      }
      return res;
    }
  }
})
