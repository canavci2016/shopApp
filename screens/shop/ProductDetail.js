import React from 'react';
import {View, Text, Image, StyleSheet, Button, ScrollView} from "react-native";
import Colors from "../../constants/Colors";
import {useSelector} from "react-redux";

const ProductDetail = props => {
    const product = useSelector(s => s.products.availableProducts.find(p => p.id == props.navigation.getParam('productId')));

    return <ScrollView>
        <Image style={styles.image} source={{uri: product.image}}/>
        <View style={styles.actions}>
            <Button color={Colors.primary} title={'To Cart'} onPress={props.onAddtoCart}/>
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
};

ProductDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontFamily:'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontFamily:'open-sans',
        fontSize: 14,
        textAlign: 'center',
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    }
});

export default ProductDetail;


