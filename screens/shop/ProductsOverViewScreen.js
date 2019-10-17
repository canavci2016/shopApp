import React from 'react';
import {FlatList, Text, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return <FlatList data={products} keyExtractor={item => item.id}
                     renderItem={({item}) => <ProductItem image={item.image} title={item.title}
                                                          price={item.price}/>}/>
};

ProductsOverViewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverViewScreen;