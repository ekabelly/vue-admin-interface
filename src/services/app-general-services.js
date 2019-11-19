import axios from 'axios';
import appApi from '../config/app-api.json5';

export default {
    fetchUsers: usersKeys => axios.post(`${appApi.serverUrl}/api/users`, { usersKeys })
}