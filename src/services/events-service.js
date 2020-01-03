import axios from 'axios';
import appApi from '../config/app-api.json5';
import util from '@/util/util';

function createEvent(token, event){
  return axios.post(`${appApi.serverUrl}/api/events/create`, { event }, util.adminHeaders(token));
}

function updateEvent(token, event, eventKey){
  return axios.put(`${appApi.serverUrl}/api/events/update/${eventKey}`, { event }, util.adminHeaders(token))
}

function addTag(token, tag){
  return axios.post('https://admin-interface-dev.firebaseio.com/config/tags.json', tag);
}

function deleteTag(token, tagId){
  return axios.delete(`${appApi.serverUrl}/api/general-services/config/tag/${tagId}`, util.adminHeaders(token));
}

export default {
    fetchConfig: () => axios.get(`${appApi.serverUrl}/api/general-services/config`),
    fetchEvents: () => axios.get(`${appApi.serverUrl}/api/events`),
    fetchEvent: eventId => axios.get(`${appApi.serverUrl}/api/events/event/${eventId}`),
    addTag,
    deleteTag,
    updateEvent,
    createEvent,
    unregisterVolunteerFromEvent: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-unregister/${userId}/${eventId}`,  util.adminHeaders(token)),
      unregisterVolunteerFromEventBackup: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-unregister-backup/${userId}/${eventId}`,  util.adminHeaders(token)),
    registerVolunteerToEvent: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-register/${userId}/${eventId}`, util.adminHeaders(token)),
    assignBackupVolunteerToEvent: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-assign-from-backup/${userId}/${eventId}`, util.adminHeaders(token)),
    assignVolunteerToBackupFromRegistered: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-reassign-to-backup/${userId}/${eventId}`, util.adminHeaders(token))
}