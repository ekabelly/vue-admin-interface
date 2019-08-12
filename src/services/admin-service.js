import axios from 'axios';
import appApi from '../config/app-api.json5';

export default {
    // fetchAdmins: () => axios.get('https://admin-interface-dev.firebaseio.com/admins.json'),
    // adminLogin: providerData => axios.post('https://us-central1-admin-interface-dev.cloudfunctions.net/api/login/admin', providerData)
    login: providerData => axios.post(`${appApi.serverUrl}/api/login/admin`, providerData),
    setCustomClaims: token => 
        axios.get(`${appApi.serverUrl}/api/login/set-custom-claims`, { 
            headers: { 'x-access-token': token } 
        })
}