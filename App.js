import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from "react-redux";
import ShopNavigator from './navigation/ShopNavigator';

import productReducer from './store/reducers/product';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';


const rootReducer = combineReducers({
    products: productReducer,
});

const store = createStore(rootReducer);

const fetchFont = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)}/>
    }

    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
