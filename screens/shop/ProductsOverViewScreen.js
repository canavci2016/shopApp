import React from 'react';
import {FlatList, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';

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

ProductsOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Cart'}
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => navData.navigation.navigate('Cart')}
                />
            </HeaderButtons>
    };
}

export default ProductsOverViewScreen;