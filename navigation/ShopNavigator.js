import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator,} from "react-navigation";
import ProductsOverView from '../screens/shop/ProductsOverViewScreen';
import ProductDetail from '../screens/shop/ProductDetail';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/Order';
import StartUpScreen from '../screens/StartUpScreen';
import UserProductScreen from '../screens/user/UserProduct';
import AuthScreen from '../screens/user/AuthScreen';
import EditProductScreen from '../screens/user/EditProduct';
import {createDrawerNavigator, DrawerItems, DrawerNavigatorItems} from "react-navigation-drawer";
import Colors from '../constants/Colors';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';


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
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23}
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
    UserProductScreen: {
        screen: UserProductScreen,
    },
    EditProductScreen: {
        screen: EditProductScreen,
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
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return <View style={{flex: 1}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerNavigatorItems {...props} />
                <Button title={'Logout'} color={Colors.accent} onPress={() => {
                    dispatch(authActions.logOut());
                }}/>
            </SafeAreaView>
        </View>
    }
});


const AuthNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen,
    },
}, {
    defaultNavigationOptions: defaultNavigationOptions
});

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);