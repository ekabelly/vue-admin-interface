import appConstants from '../config/constants';

const adminHeaders = token =>({
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
});

export default {
    adminHeaders,
    resHandler: res => {
        // console.log({res});
        if(res && res.data && (res === true || res.status === appConstants.successStatus || Object.values(res).length > 0)){
            return res.data.data || res.data || res;
        }
        alert('הייתה בעיה בשירות. אנא נסה שוב מאוחר יותר');
        return res;
    },
    errHandler: err => {
        let msg = 'הייתה בעיה בשירות. אנא נסה שוב מאוחר יותר';
        if(err.response.status === 401){
            msg = 'משתמש זה אינה מורשה להכנס. אנא פנה למנהל אחר שיוסיף אותך לרשימת המשתמשים המורשים.';
        }
        alert(msg);
        window.location.reload();
    },
    copyObject: obj => JSON.parse(JSON.stringify(obj))
}