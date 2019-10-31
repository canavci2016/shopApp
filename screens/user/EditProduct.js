import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet, Platform} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import {connect, useSelector} from "react-redux";
import * as productActions from '../../store/actions/product';

const EditProduct = props => {
    const prodId = props.navigation.getParam('productId');
    const product = props.userProducts.find(prod => prod.id === prodId);

    const [title, setTitle] = useState(product ? product.title : '');
    const [imageUrl, setImageUrl] = useState(product ? product.image : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');


    const submitHandler = useCallback(() => {
        if (product) {
            props.updateProduct(product.id, title, description, imageUrl);
        } else {
            props.createProduct(title, description, +price, imageUrl);
        }
        props.navigation.goBack();
    }, [product, title, imageUrl, price, description]);


    useEffect(() => {

        console.log('EditProduct-useEffect');
        props.navigation.setParams({'submit': submitHandler});
    }, [submitHandler]);

    return <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Edit Product Screen</Text>
                <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
            </View>

            <View style={styles.formControl}>
                <Text style={styles.label}>Image Url</Text>
                <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput style={styles.input} value={price.toString()} onChangeText={text => setPrice(text)}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
            </View>
        </View>
    </ScrollView>
}


const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }

});

EditProduct.navigationOptions = navData => {
    const submitFunc = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit  Products' : 'Add Product',
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title={'Save'}
                    iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                    onPress={submitFunc}
                />
            </HeaderButtons>
    };

};

const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        userProducts: state.products.userProducts,
    };
};

const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        createProduct: (title, description, price, imageUrl) => dispatch(productActions.createProduct(title, description, price, imageUrl)),
        // Decrease Counter
        updateProduct: (id, title, description, imageUrl) => dispatch(productActions.updateProduct(id, title, description, imageUrl)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);