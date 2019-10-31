import React from 'react';
import {Alert, Button, FlatList, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/product";


const UserProduct = props => {
    const products = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure ?',
            'Keep your app up to date to enjoy the latest features',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => dispatch(productActions.deleteProduct(id)),
                },
            ],
        );
    }

    return <FlatList data={products} keyExtractor={item => item.id} renderItem={({item}) =>
        <ProductItem title={item.title} image={item.image} price={item.price}
                     onSelect={() => {
                     }}>
            <Button color={Colors.primary} title={'Edit'}
                    onPress={() => props.navigation.navigate({
                        routeName: 'EditProductScreen',
                        params: {productId: item.id}
                    })}/>
            <Button color={Colors.accent} title={'Delete'}
                    onPress={deleteHandler.bind(this, item.id)}/>
        </ProductItem>
    }/>
};

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
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Cart'}
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => navData.navigation.navigate('EditProductScreen')}
                />
            </HeaderButtons>
    };
};


export default UserProduct;