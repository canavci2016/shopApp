import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet, Platform, Alert} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import {connect} from "react-redux";
import * as productActions from '../../store/actions/product';

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
}

const EditProduct = props => {
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
    props.navigation.goBack();
  }, [product, title, imageUrl, price, description, formState]);


  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = text.trim().length > 0 ? true : false;
    dispatch({type: FORM_INPUT_UPDATE, value: text, isValid, input: inputIdentifier});
  };

  useEffect(() => {
    console.log('EditProduct-useEffect');
    props.navigation.setParams({'submit': submitHandler});
  }, [submitHandler]);

  return <ScrollView>
    <View style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Edit Product Screen</Text>
        <TextInput
          style={styles.input}
          value={title}
          autoCapitalize={'sentences'}
          autoCorrect
          keyboardType={'default'}
          onChangeText={textChangeHandler.bind(this, 'title')}
          returnKeyType={'next'}
          onEndEditing={() => console.log('onEndEditing')}
          onSubmitEditing={() => console.log('onSubmitEditing')}

        />
        {!formState.inputValidities.title && <Text>Please Enter a valid Title</Text>}
      </View>

      <View style={styles.formControl}>
        <Text style={styles.label}>Image Url</Text>
        <TextInput style={styles.input}
                   value={imageUrl}
                   returnKeyType={'done'}
                   onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                   onChangeText={text => setImageUrl(text)}/>
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input}
                   keyboardType={'decimal-pad'}
                   value={price.toString()}
                   onChangeText={textChangeHandler.bind(this, 'price')}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input}
                   value={description}
                   onChangeText={textChangeHandler.bind(this, 'description')}
        />
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