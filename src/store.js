import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';
import sessionConfig from './config/session.config';
import eventsService from './services/events-service';
import messagesService from './services/messages-service';
import util from './util/util';
import adminService from './services/admin-service';

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
    user: null,
    isMobile: window.innerWidth < 768
  },
  getters: {
    user: state => state.user,
    isMobile: state => state.isMobile
  },
  mutations: {
    setUser: (state, user) => {
      let reroute;
      if(!state.user){
        reroute = true;
      }
      state.user = user;
      if(reroute){
        window.location.href = '/events'
      }
    },
    setIsMobile(state){
      state.isMobile = window.innerWidth < 768
    }
  },
  actions: {
    logout: context => {
      context.dispatch('cleanState');
      firebase.auth().signOut();
      window.location.href = '';
    },
    cleanState(context){
      context.commit('setUser', null);
    },
    async fetchAdmins(){
      const res = await adminService.fetchAdmins();
      return util.resHandler(res);
    },
    async fetchEvents(){
      const res = await eventsService.fetchEvents();
      return util.resHandler(res);
    },
    async fetchMessages(){
      const res = await messagesService.fetchMessages();
      return util.resHandler(res);
    },
    async fetchMessage(context, messageKey){
      const res = await messagesService.fetchMessage(messageKey);
      return util.resHandler(res);
    },
    async submitMessage(context, message){
      const res = await messagesService.submitMessage(message);
      return util.resHandler(res);
    },
    async updateMessage(context, { message, messageKey }){
      const res = await messagesService.updateMessage(message, messageKey);
      return util.resHandler(res);
    },
    async deleteMessage(context, messageKey){
      const res = await messagesService.deleteMessage(messageKey);
      return util.resHandler(res);
    },
  },
  plugins: [vuexCookie.plugin]
})
