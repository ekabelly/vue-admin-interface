import axios from 'axios';
import appApi from '../config/app-api.json5';

export default {
    submitMessage:  message => axios.post('https://admin-interface-dev.firebaseio.com/newsFeed.json', message),
    updateMessage: (message, messageKey) => axios.put(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`, message),
    deleteMessage: messageKey => ({ data: axios.delete(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`)}),
    fetchMessages: () => axios.get(`${appApi.serverUrl}/api/messages`),
    fetchMessage: messageKey => axios.get(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`)
}