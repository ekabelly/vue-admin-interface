import axios from 'axios';
import appApi from '../config/app-api.json';

export default {
    fetchEvents: () => axios.get(`${appApi.serverUrl}/api/events`),
    fetchEvent: eventId => axios.get(`${appApi.serverUrl}/api/event/${eventId}`)
}