import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import {connect} from "react-redux";
import * as productActions from '../../store/actions/product';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'UPDATE';
const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValues,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {formIsValid: updatedFormIsValid, inputValues: updateValues, inputValidities: updatedValidities};
    }

    return state;
};

const EditProduct = props => {
    const [isLoading, setIsLoadind] = useState(false);
    const [error, setError] = useState(null);

    const prodId = props.navigation.getParam('productId');
    const product = props.userProducts.find(prod => prod.id === prodId);


    const [formState, dispatch] = useReducer(formReducer, {
        inputValues: {
            title: product ? product.title : '',
            imageUrl: product ? product.image : '',
            price: product ? product.price : '',
            description: product ? product.description : '',
        },
        inputValidities: {
            title: product ? true : false,
            imageUrl: product ? true : false,
            description: product ? true : false,
            price: product ? true : false,
        },
        formIsValid: product ? true : false,
    });

    const {title, imageUrl, price, description} = formState.inputValues;

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Input Validations', 'Please Check validations', [{text: 'Okey'}]);
            return true;
        }
        if (product) {
            props.updateProduct(product.id, title, description, imageUrl);
        } else {
            props.createProduct(title, description, +price, imageUrl);
        }
        //   props.navigation.goBack();
    }, [product, title, imageUrl, price, description, formState]);


    const inputChangeHandler = useCallback((inputIdentifier, value, isValid) => {
        dispatch({type: FORM_INPUT_UPDATE, value, isValid, input: inputIdentifier});
    }, [dispatch]);

    useEffect(() => {
        console.log('EditProduct-useEffect');
        props.navigation.setParams({'submit': submitHandler});
    }, [submitHandler]);

    return <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'} keyboardVerticalOffset={100}>
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id={'title'}
                    label={'Title'}
                    errorText={'Please Enter a valid Title'}
                    autoCapitalize={'sentences'}
                    autoCorrect
                    keyboardType={'default'}
                    initialValue={title}
                    initiallyValid={true}
                    onInputChange={inputChangeHandler}
                    required
                />

                <Input
                    id={'imageUrl'}
                    label={'Image Url'}
                    errorText={'Please Enter a valid Image Url'}
                    autoCapitalize={'sentences'}
                    autoCorrect
                    keyboardType={'default'}
                    returnKeyType={'done'}
                    onInputChange={inputChangeHandler}
                    initiallyValid={true}
                    initialValue={imageUrl}
                    required
                />

                <Input
                    id={'price'}
                    label={'Price'}
                    errorText={'Please Enter a valid price'}
                    autoCapitalize={'sentences'}
                    autoCorrect
                    keyboardType={'decimal-pad'}
                    onInputChange={inputChangeHandler}
                    initiallyValid={true}
                    initialValue={price.toString()}
                    required
                    min={0}
                />

                <Input
                    id={'description'}
                    label={'Description'}
                    errorText={'Please Enter a description'}
                    keyboardType={'default'}
                    onInputChange={inputChangeHandler}
                    multiline
                    numberOfLines={5}
                    initiallyValid={true}
                    initialValue={description}
                />

            </View>
        </ScrollView>
    </KeyboardAvoidingView>
};


const styles = StyleSheet.create({
    form: {
        margin: 20
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