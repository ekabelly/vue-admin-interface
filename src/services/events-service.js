import axios from 'axios';
import appApi from '../config/app-api.json5';

export default {
    fetchConfig: () => axios.get('https://admin-interface-dev.firebaseio.com/config.json'),
    updateEvent: (event, eventKey) => axios.put(`https://admin-interface-dev.firebaseio.com/events/${eventKey}.json`, event),
    createEvent: event => axios.post(`https://admin-interface-dev.firebaseio.com/events.json`, event),
    fetchEvents: () => axios.get(`${appApi.serverUrl}/api/events`),
    fetchEvent: eventId => axios.get(`${appApi.serverUrl}/api/event/${eventId}`)
}