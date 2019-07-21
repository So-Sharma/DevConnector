import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthtoken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {

     axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );

}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const loginUser = userData => dispatch => {

    axios
    .post('/api/users/login', userData)
    .then(res => {
        //Save to localstorage
            const {token} = res.data;

        //set token to ls (browser)
            localStorage.setItem('jwtToken', token);

        // set token to auth header
            setAuthToken(token);

        //Decode token to get user data
            const decoded = jwt_decode(token);

        // set current user
            dispatch(setCurrentUser(decoded))
    } )
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
     );
}


export const logoutUser = () => dispatch => {
    //Remove token from localstorage
    localStorage.removeItem('jwtToken');
    
    //remove token from auth header
    setAuthToken(false);

    //Clean the user data from redux store
    dispatch(setCurrentUser({}));
}