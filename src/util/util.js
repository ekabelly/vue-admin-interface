import appConstants from '../config/constants';

export default {
    resHandler: res => {
        if(res && res.status === appConstants.successStatus){
            return res.data || true;
        }
        alert('הייתה בעיה בשירות. אנא נסה שוב מאוחר יותר');
        return res;
    }
}