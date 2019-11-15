import {LOGIN, SIGN_UP} from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {token: action.token, userId: action.userId};
        case LOGIN:
            console.log(action);
            return {token: action.token, userId: action.userId};
    }

    return state;
};