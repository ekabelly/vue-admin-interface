import axios from 'axios';
import appApi from '../config/app-api.json5';

const adminHeaders = token =>({
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
});

export default {
    fetchConfig: () => axios.get(`${appApi.serverUrl}/api/general-services/config`),
    addTag: tag => axios.post('https://admin-interface-dev.firebaseio.com/config/tags.json', tag),
    // updateEvent: (event, eventKey) => axios.put(`https://admin-interface-dev.firebaseio.com/events/${eventKey}.json`, event),
    updateEvent: (event, eventKey) => axios.put(`${appApi.serverUrl}/api/events/update/${eventKey}`, { event }),
    createEvent: event => axios.post(`${appApi.serverUrl}/api/events/create`, { event }),
    fetchEvents: () => axios.get(`${appApi.serverUrl}/api/events`),
    fetchEvent: eventId => axios.get(`${appApi.serverUrl}/api/events/event/${eventId}`),
    unregisterVolunteerFromEvent: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-unregister/${userId}/${eventId}`,  adminHeaders(token)),
    registerVolunteerToEvent: (token, eventId, userId) =>
      axios.get(`${appApi.serverUrl}/api/events/event-register/${userId}/${eventId}`, adminHeaders(token))
}