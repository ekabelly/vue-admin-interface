import axios from 'axios';
// import firebase from '../config/firebase.config';
// const DB = firebase.database();

export default {
    // fetchEvents: async () => {
    //     const res = await DB.ref('/events').once('value');
    //     return res.val();
    // }
    fetchEvents: () => axios.get('https://us-central1-admin-interface-dev.cloudfunctions.net/api/events')
}