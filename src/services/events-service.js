import axios from 'axios';
// import firebase from '../config/firebase.config';
// const DB = firebase.database();

export default {
    // fetchEvents: async () => {
    //     const res = await DB.ref('/events').once('value');
    //     return res.val();
    // }
    fetchEvents: () => axios.get('https://us-central1-admin-interface-dev.cloudfunctions.net/api/events'),
    fetchEvent: eventKey => axios.get(`https://us-central1-admin-interface-dev.cloudfunctions.net/api/event/${eventKey}`),
    fetchConfig: () => axios.get('https://admin-interface-dev.firebaseio.com/config.json'),
    updateEvent: (event, eventKey) => axios.put(`https://admin-interface-dev.firebaseio.com/events/${eventKey}.json`, event),
    createEvent: event => axios.post(`https://admin-interface-dev.firebaseio.com/events.json`, event)
}