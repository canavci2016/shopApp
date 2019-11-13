import React, {useEffect, useState, useCallback} from 'react';
import {Button, FlatList, Platform, View, StyleSheet, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/product';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import Loading from '../../components/UI/Loading';
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [error, setError] = useState(null);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetailScreen',
            params: {productId: id, productTitle: title},
        });
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefresh(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (e) {
            setError(e.message);
        }
        setIsRefresh(false);
    }, [dispatch]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false));
    }, [dispatch, loadProducts]);

    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <View style={[styles.centered]}>
            <Text>{error}</Text>
            <Button title={'Try Again'} onPress={loadProducts}/>
        </View>;
    }

    if (!isLoading && products.length === 0) {
        return <View style={[styles.centered]}>
            <Text>No products found . Maybe start adding some</Text>
        </View>;
    }

    return <FlatList refreshing={isRefresh} onRefresh={loadProducts} data={products} keyExtractor={item => item.id}
                     renderItem={({item}) => <ProductItem
                         onSelect={() => selectHandler(item.id, item.title)}
                         image={item.image} title={item.title}
                         price={item.price}
                     >
                         <Button color={Colors.primary} title={'Details'}
                                 onPress={() => selectHandler(item.id, item.title)}/>
                         <Button color={Colors.accent} title={'To Cart'}
                                 onPress={() => dispatch(cartActions.addToCart(item))}/>
                     </ProductItem>}/>
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

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
};

export default ProductsOverViewScreen;