import React from 'react';
import {Button, FlatList, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";

import ProductItem from '../../components/shop/ProductItem';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/product";


const UserProduct = props => {
    const products = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    return <FlatList data={products} keyExtractor={item => item.id} renderItem={({item}) =>
        <ProductItem title={item.title} image={item.image} price={item.price}
                     onSelect={() => {
                     }}>
            <Button color={Colors.primary} title={'Edit'} onPress={() => console.log('UserProduct-Edit')}/>
            <Button color={Colors.accent} title={'Delete'}
                    onPress={() => dispatch(productActions.deleteProduct(item.id))}/>
        </ProductItem>
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