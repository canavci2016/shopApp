import React from 'react';
import Colors from '../../constants/Colors';
import {ActivityIndicator, StyleSheet, View} from 'react-native';


const Loading = props => {
    return <View style={[styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} {...props} />
    </View>
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loading;
