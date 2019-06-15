import axios from 'axios';
// import firebase from '../config/firebase.config';
// const DB = firebase.database();

export default {
    // submitMessage: async message => {
    //     const res = await DB.ref(`/newsFeed`).push(message);
    //     return res;
    // },
    submitMessage:  message => axios.post('https://admin-interface-dev.firebaseio.com/newsFeed.json', message),
    // updateMessage: async (message, messageKey) => 
    //     new Promise(resolve =>DB.ref('/newsFeed').update({ ['/' + messageKey]: message}, err => err ? resolve(err) : resolve(true))),
    updateMessage: (message, messageKey) => axios.put(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`, message),
    deleteMessage: messageKey => axios.delete(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`),
    fetchMessages: () => axios.get('https://admin-interface-dev.firebaseio.com/newsFeed.json'),
    fetchMessage: messageKey => axios.get(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`)
}