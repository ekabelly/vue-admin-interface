import axios from 'axios';
import appApi from '../config/app-api.json5';

export default {
    fetchConfig: () => axios.get('https://admin-interface-dev.firebaseio.com/config.json'),
    addTag: tag => axios.post('https://admin-interface-dev.firebaseio.com/config/tags.json', tag),
    // updateEvent: (event, eventKey) => axios.put(`https://admin-interface-dev.firebaseio.com/events/${eventKey}.json`, event),
    updateEvent: (event, eventKey) => axios.put(`${appApi.serverUrl}/api/events/update/${eventKey}`, { event }),
    createEvent: event => axios.post(`${appApi.serverUrl}/api/events/create`, { event }),
    fetchEvents: () => axios.get(`${appApi.serverUrl}/api/events`),
    fetchEvent: eventId => axios.get(`${appApi.serverUrl}/api/events/event/${eventId}`)
}