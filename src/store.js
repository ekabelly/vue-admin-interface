import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import VuexPersistence from 'vuex-persist';
import sessionConfig from './config/session.config';
import eventsService from './services/events-service';
import constants from './config/constants';
import { isContext } from 'vm';

Vue.use(Vuex);


const vuexCookie = new VuexPersistence({
  restoreState: key => {
    let localStorageData = JSON.parse(window.localStorage.getItem(key));
    if (localStorageData) {
      let stateExpirationTime = moment(localStorageData.stateSaveTime).add(
        sessionConfig.STATE_STORAGE_SAVE_DURATION_IN_MINUTES,
        'minutes'
      );
      if (moment(new Date()).isBefore(stateExpirationTime)) {
        return localStorageData;
      } else {
        localStorage.removeItem(key);
        return null;
      }
    } else {
      return null;
    }
  },
  saveState: (key, state) => {
    state.stateSaveTime = moment(new Date());
    window.localStorage.setItem(key, JSON.stringify(state));
  }
});

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    logout: context => {
      context.dispatch('cleanState');
      window.location.href = ''
    },
    cleanState(context){
      context.commit('setUser', null);
    },
    async fetchEvents(){
      const res = await eventsService.fetchEvents();
      if(res && res.status === constants.successStatus){
        return res.data;
      }
      return res;
    }
  },
  plugins: [vuexCookie.plugin]
})
