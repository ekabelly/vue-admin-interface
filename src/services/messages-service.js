import axios from 'axios';

export default {
    submitMessage: message => axios.post('https://admin-interface-dev.firebaseio.com/newsFeed.json', message)
}