import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import eventsService from './services/events-service';
import messagesService from './services/messages-service';
import util from './util/util';
import adminService from './services/admin-service';
import appGeneralServices from './services/app-general-services';
import vuexCookie from './config/vuex-cookie';

Vue.use(Vuex);

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
    logout: async context => {
      await firebase.auth().signOut().catch(err => alert('הייתה בעיה בהתנתקות.', err));
      context.dispatch('cleanState');
      window.location.href = '';
    },
    cleanState(context){
      context.commit('setUser', null);
    },
    async login(context, googleRes){
      const email = googleRes.additionalUserInfo.profile.email;
      const res = await adminService.login({ email, uid: googleRes.user.uid });
      if(res.data && res.data.token){
        firebase.auth().signInWithCustomToken(res.data.token).catch(error =>
          console.error(error));
        let token = await firebase.auth().currentUser.getIdToken(true);
        await adminService.setCustomClaims(token);
        token = await firebase.auth().currentUser.getIdToken(true);
        context.commit('setUser', {
          displayName: googleRes.additionalUserInfo.profile.name,
          email,
          token
        });
      }
      return util.resHandler(res);
    },
    async fetchVolunteers(context, usersKeysList){
      const res = await appGeneralServices.fetchUsers(usersKeysList);
      return util.resHandler(res);
    },
    // async fetchAdmins(){
    //   const res = await adminService.fetchAdmins();
    //   return util.resHandler(res);
    // },
    async unregisterVolunteerFromEvent(context, {eventId, userId}){
      const token = context.getters.user.token;
      const res = await eventsService.unregisterVolunteerFromEvent(token, eventId, userId);
      return res;
    },
    async unregisterVolunteerFromEventBackup(context, {eventId, userId}){
      const token = context.getters.user.token;
      const res = await eventsService.unregisterVolunteerFromEventBackup(token, eventId, userId);
      return res;
    },
    async registerVolunteerToEvent(context, {eventId, userId}){
      const token = context.getters.user.token;
      const res = await eventsService.registerVolunteerToEvent(token, eventId, userId);
      return res;
    },
    async assignVolunteerToBackupFromRegistered(context, {eventId, userId}){
      const token = context.getters.user.token;
      const res = await eventsService.assignVolunteerToBackupFromRegistered(token, eventId, userId);
      return res;
    },
    async assignBackupVolunteerToEvent(context, {eventId, userId}){
      const token = context.getters.user.token;
      const res = await eventsService.assignBackupVolunteerToEvent(token, eventId, userId);
      return res;
    },
    async fetchEvents(){
      const res = await eventsService.fetchEvents();
      return util.resHandler(res);
    },
    async fetchEvent(context, eventKey){
      const res = await eventsService.fetchEvent(eventKey);
      return util.resHandler(res);
    },
    async createEvent(context, event){
      const res = await eventsService.createEvent(context.getters.user.token, event);
      return util.resHandler(res);
    },
    async updateEvent(context, {eventKey, event}){
      const res = await eventsService.updateEvent(context.getters.user.token, event, eventKey);
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
      const res = await messagesService.submitMessage(context.getters.user.token, message);
      return util.resHandler(res);
    },
    async updateMessage(context, { message, messageKey }){
      const res = await messagesService.updateMessage(context.getters.user.token, message, messageKey);
      return util.resHandler(res);
    },
    async deleteMessage(context, messageKey){
      const res = await messagesService.deleteMessage(context.getters.user.token, messageKey);
      return util.resHandler(res);
    },
    async fetchConfig(context){
      const res = await eventsService.fetchConfig(context.getters.user.token);
      return util.resHandler(res);
    },
    async addTag(context, tag){
      const res = await eventsService.addTag(context.getters.user.token, {translation: tag});
      return util.resHandler(res);
    },
    async deleteTag(context, tagId){
      const res = await eventsService.deleteTag(context.getters.user.token, tagId);
      return util.resHandler(res);
    }
  },
  plugins: [vuexCookie.plugin]
})
