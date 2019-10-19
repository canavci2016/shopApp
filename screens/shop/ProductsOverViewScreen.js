import React from 'react';
import {FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return <FlatList data={products} keyExtractor={item => item.id}
                     renderItem={({item}) => <ProductItem
                         onViewDetail={() => props.navigation.navigate({
                             routeName: 'ProductDetailScreen',
                             params: {productId: item.id, productTitle: item.title},
                         })}
                         onAddtoCart={() => dispatch(cartActions.addToCart(item))}
                         image={item.image} title={item.title}
                         price={item.price}
                     />}/>
};

ProductsOverViewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverViewScreen;