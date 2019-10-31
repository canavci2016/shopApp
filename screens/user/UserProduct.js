import React from 'react';
import {FlatList, Platform} from "react-native";

import {useSelector} from "react-redux";

import ProductItem from '../../components/shop/ProductItem';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';


const UserProduct = props => {
    const products = useSelector(state => state.products.userProducts);

    return <FlatList data={products} keyExtractor={item => item.id} renderItem={({item}) =>
        <ProductItem title={item.title} image={item.image} price={item.price}
                     onViewDetail={() => {
                     }}
                     onAddtoCart={() => {
                     }}
        />
    }/>
}

UserProduct.navigationOptions = navData => {

    return {
        headerTitle: 'User Products',
        headerLeft:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Cart'}
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>,
    };

};


export default UserProduct;