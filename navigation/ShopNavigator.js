import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import ProductsOverView from '../screens/shop/ProductsOverViewScreen';
import ProductDetail from '../screens/shop/ProductDetail';
import Colors from '../constants/Colors';
import {Platform} from 'react-native';

const ProductNavigator = createStackNavigator({
    ProductsOverViewScreen: {
        screen: ProductsOverView
    },
    ProductDetailScreen: {
        screen: ProductDetail
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,

    }
});


export default createAppContainer(ProductNavigator);