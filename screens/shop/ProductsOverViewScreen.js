import React from 'react';
import {FlatList} from "react-native";
import {useSelector} from "react-redux";


const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return <FlatList data={products} keyExtractor={item => item.id}/>
}

export default ProductsOverViewScreen;