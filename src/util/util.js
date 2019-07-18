import appConstants from '../config/constants';

export default {
    resHandler: res => {
        // console.log({res});
        if(res && res.data && (res === true || res.status === appConstants.successStatus || Object.values(res).length > 0)){
            return res.data.data || res.data || res;
        }
        alert('הייתה בעיה בשירות. אנא נסה שוב מאוחר יותר');
        return res;
    },
    copyObject: obj => JSON.parse(JSON.stringify(obj))
}