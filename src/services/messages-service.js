import axios from 'axios';

export default {
    submitMessage: message => axios.post('https://admin-interface-dev.firebaseio.com/newsFeed.json', message),
    updateMessage: (message, messageKey) => axios.put(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`, message),
    deleteMessage: messageKey => axios.delete(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`),
    fetchMessages: () => axios.get('https://admin-interface-dev.firebaseio.com/newsFeed.json'),
    fetchMessage: messageKey => axios.get(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`)
}