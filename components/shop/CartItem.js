import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const CartItem = props => {
    const TouchableCmp = (Platform.OS == 'android' && Platform.Version > 20) ? TouchableNativeFeedback : TouchableOpacity;

    return <View style={styles.container}>
        <View style={styles.itemData}>
            <Text style={styles.mainText}>{props.quantity} </Text>
            <Text style={styles.mainText}>{props.title}</Text>
        </View>
        <View style={styles.itemData}>
            <Text style={styles.amount}>
                {props.amount.toFixed(2)}
            </Text>
            <TouchableCmp onPress={props.onRemove} style={styles.deleteButton}>
                <Ionicons name={Platform.OS == 'android' ? 'md-trash' : 'ios-trash'} size={30} color={'red'}/>
            </TouchableCmp>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,

    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 15,
    },

});

export default CartItem;


