import React, {useState, useReducer, useCallback, useEffect} from 'react';
import Loading from '../components/UI/Loading';

const StartUpScreen = props => {
    useEffect(() => {
        const tryLogin = async () => {
            setTimeout(() => {
                props.navigation.navigate('Auth');
            }, 2000);

        };

        tryLogin();

    }, []);

    return <Loading/>;
};

export default StartUpScreen;