import VuexPersistence from 'vuex-persist';
import sessionConfig from './session.config';
import moment from 'moment';

export default new VuexPersistence({
    restoreState: key => {
        let localStorageData = JSON.parse(window.localStorage.getItem(key));
        if (localStorageData) {
            let stateExpirationTime = moment(localStorageData.stateSaveTime).add(
                sessionConfig.STATE_STORAGE_SAVE_DURATION_IN_MINUTES,
                'minutes'
            );
            if (moment(new Date()).isBefore(stateExpirationTime)) {
                return localStorageData;
            } else {
                localStorage.removeItem(key);
                return null;
            }
        } else {
            return null;
        }
    },
    saveState: (key, state) => {
        state.stateSaveTime = moment(new Date());
        window.localStorage.setItem(key, JSON.stringify(state));
    }
});