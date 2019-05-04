import axios from 'axios';

export default {
    fetchEvents: () => axios.get('https://admin-interface-dev.firebaseio.com/events.json')
}