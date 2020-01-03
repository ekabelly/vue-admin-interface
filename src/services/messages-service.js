import axios from 'axios';
import appApi from '../config/app-api.json5';
import util from '@/util/util';

export default {
    // submitMessage:  (token, message) => axios.post('https://admin-interface-dev.firebaseio.com/newsFeed.json', message),
    submitMessage:  (token, message) => axios.post(`${appApi.serverUrl}/api/messages`, { message }, util.adminHeaders(token)),
    updateMessage: (token, message, messageKey) => axios.put(`${appApi.serverUrl}/api/messages/${messageKey}`, { message }, util.adminHeaders(token)),
    // deleteMessage: (token, messageKey) => ({ data: axios.delete(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`)}),
    deleteMessage: (token, messageKey) => axios.delete(`${appApi.serverUrl}/api/messages/${messageKey}`, util.adminHeaders(token)),
    fetchMessages: () => axios.get(`${appApi.serverUrl}/api/messages`),
    // fetchMessage: messageKey => axios.get(`https://admin-interface-dev.firebaseio.com/newsFeed/${messageKey}.json`)
    fetchMessage: messageKey => axios.get(`${appApi.serverUrl}/api/messages/${messageKey}`)
}