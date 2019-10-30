import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Button} from "react-native";
import Colors from "../../constants/Colors";
import CartItem from '../../components/shop/CartItem';

const OrderItem = props => {
    const [showDetail, setShowDetail] = useState(false);
    return <View style={styles.container}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button color={Colors.primary} title={showDetail ? 'Hide Details' : 'Show Details'} onPress={() => {
            setShowDetail(prevState => !prevState);
        }
        }/>
        {showDetail && <View style={styles.detail}>
            {props.items.map(item => <CartItem key={item.productId} quantity={item.quantity} amount={item.sum}
                                               title={item.productTitle}/>)}
        </View>}
    </View>
};

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 21},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888',
    },
    detail: {
        width: '100%',
    }
});

export default OrderItem;


