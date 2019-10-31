import React from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";

const ProductItem = props => {
    const TouchableCmp = (Platform.OS == 'android' && Platform.Version > 20) ? TouchableNativeFeedback : TouchableOpacity;

    return <View style={styles.container}>
        <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.image}}/>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>{props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </View>
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
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    detail: {
        alignItems: 'center',
        height: '17%',
        padding: 10,

    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        width: '100%',
        height: '60%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    }
});

export default ProductItem;


