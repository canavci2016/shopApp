import React from 'react';
import {Button, FlatList, Platform, View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetailScreen',
            params: {productId: id, productTitle: title},
        });
    };


    return <FlatList data={products} keyExtractor={item => item.id}
                     renderItem={({item}) => <ProductItem
                         onSelect={() => selectHandler(item.id, item.title)}
                         image={item.image} title={item.title}
                         price={item.price}
                     >
                         <Button color={Colors.primary} title={'Details'} onPress={() => selectHandler(item.id, item.title)}/>
                         <Button color={Colors.accent} title={'To Cart'} onPress={() => dispatch(cartActions.addToCart(item))}/>
                     </ProductItem>}/>
};

ProductsOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Cart'}
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>,
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