import axios from 'axios';

export default {
    fetchAdmins: () => axios.get('https://admin-interface-dev.firebaseio.com/admins.json')
}