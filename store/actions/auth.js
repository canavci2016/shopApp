export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
import {AUTH_API_KEY} from "../../constants/auth";
//import AsyncStorage from '@react-native-community/async-storage';

let timer;


export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        saveDataToStorage(token, userId, new Date(new Date().getTime() + parseInt(expiryTime) * 1000));
        dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, token, userId});
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, returnSecureToken: true}),
            }
        );

        const responseData = await response.json();
        dispatch(authenticate(responseData.localId, responseData.idToken, responseData.expiresIn));

    }
};

export const logIn = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, returnSecureToken: true}),
            }
        );

        if (!response.ok) {
            const responseData = await response.json();
            let message = 'Something went wrong';
            const errorId = responseData.error.message;
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'There is no user record corresponding to this identifier';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'The password is invalid or the user does not have a password.';
            } else if (errorId === 'USER_DISABLED') {
                message = 'The user account has been disabled by an administrator.';
            }
            throw  new Error(message);
        }
        const responseData = await response.json();
        dispatch(authenticate(responseData.localId, responseData.idToken, responseData.expiresIn));
    }
};


export const logOut = () => {
    //AsyncStorage.removeItem('userData');
    clearTimer();
    return {type: LOGOUT};
};

const clearTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return async dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut());
        }, expirationTime)
    }
};


const saveDataToStorage = (token, userId, expirationDate) => {
    //  AsyncStorage.setItem('userData', JSON.stringify({token, userId, expirationDate: expirationDate.toISOString()}));
};