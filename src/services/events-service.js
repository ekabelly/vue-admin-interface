import axios from 'axios';
// import firebase from '../config/firebase.config';
// const DB = firebase.database();

export default {
    // fetchEvents: async () => {
    //     const res = await DB.ref('/events').once('value');
    //     return res.val();
    // }
    fetchEvents: () => axios.get('https://admin-interface-dev.firebaseio.com/events.json')
}