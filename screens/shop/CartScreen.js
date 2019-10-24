import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import Colors from "../../constants/Colors";

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.carts.totalAmount);
    const items = useSelector(state => {
        const transFormed = [];
        for (const key in state.carts.items) {
            transFormed.push({
                productId: key,
                productTitle: state.carts.items[key].title,
                productPrice: state.carts.items[key].price,
                quantity: state.carts.items[key].quantity,
                sum: state.carts.items[key].sum,
            })
        }
        return transFormed;
    });
    console.log(items);

    return <View style={styles.screen}>
        <View style={styles.summary}>
            <Text style={styles.summaryText}> Total : <Text
                style={styles.amont}>${cartTotalAmount.toFixed(2)}</Text></Text>
            <Button title={'Order Now'} disabled={items.length === 0}/>
        </View>
        <View>
            <Text>CART ITEMS</Text>
        </View>
    </View>

}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 21},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amont: {
        color: Colors.primary
    }

});

export default CartScreen;