//function that taken token if token is there it will added to header if not get deleted from header

import axios from 'axios';
const setAuthToken = token => {
    //send token with every request
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;