import axios from 'axios';
import appApi from '../config/app-api.json5';

export default {
    fetchUsers: usersKeys => axios.get(`${appApi.serverUrl}/api/users`, { usersKeys })
}