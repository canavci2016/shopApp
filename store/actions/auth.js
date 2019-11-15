export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
import {AUTH_API_KEY} from "../../constants/auth";

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
        dispatch({type: SIGN_UP, token: responseData.idToken, userId: responseData.localId});
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
        dispatch({type: LOGIN, token: responseData.idToken, userId: responseData.localId});
    }
};