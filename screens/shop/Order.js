import React, {useEffect, useState} from 'react';
import {FlatList, Text, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';
import Loading from '../../components/UI/Loading';

const OrdersScreen = props => {
    const [isLoading, setIsLoadind] = useState(false);
    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    const loadOrders = async () => {
        setIsLoadind(true);
        await dispatch(ordersActions.fetchOrders());
        setIsLoadind(false);
    };

    useEffect(() => {
        loadOrders();
    }, [dispatch]);

    if (isLoading) {
        return <Loading/>
    }

    return <FlatList data={orders} keyExtractor={item => item.id}
                     renderItem={({item}) => <OrderItem items={item.items} amount={item.totalAmount}
                                                        date={item.readableDate}/>}/>

}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
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


export default OrdersScreen;