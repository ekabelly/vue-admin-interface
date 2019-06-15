import appConstants from '../config/constants';

export default {
    resHandler: res => {
        if(res && (res === true || res.status === appConstants.successStatus || Object.values(res).length > 0)){
            return res.data || res;
        }
        alert('הייתה בעיה בשירות. אנא נסה שוב מאוחר יותר');
        return res;
    }
}