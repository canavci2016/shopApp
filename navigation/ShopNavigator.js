import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import ProductsOverView from '../screens/shop/ProductsOverViewScreen';
import ProductDetail from '../screens/shop/ProductDetail';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/Order';
import UserProductScreen from '../screens/user/UserProduct';
import {createDrawerNavigator} from "react-navigation-drawer";
import Colors from '../constants/Colors';
import {Platform} from 'react-native';
import {Ionicons} from "@expo/vector-icons";


const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,

}
const ProductNavigator = createStackNavigator({
    ProductsOverViewScreen: {
        screen: ProductsOverView
    },
    ProductDetailScreen: {
        screen: ProductDetail
    },
    Cart: {
        screen: CartScreen
    },
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS == 'android' ? 'md-cart' : 'ios-cart'} size={23}
                                              color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavigationOptions
});


const OrdersNavigator = createStackNavigator({
    OrdersScreen: {
        screen: OrderScreen
    },
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS == 'android' ? 'md-list' : 'ios-list'} size={23}
                                              color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavigationOptions
});

const UserNavigator = createStackNavigator({
    OrdersScreen: {
        screen: UserProductScreen
    },
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS == 'android' ? 'md-create' : 'ios-create'} size={23}
                                              color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavigationOptions
});


const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: UserNavigator,

}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);