import PRODUCT from '../../data/dummy-data';
import {CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT} from "../actions/product";
import ProductModel from '../../models/product';

const initialState = {
    availableProducts: [],
    userProducts: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case  SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts,
            };
        case  DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId),
            };
        case CREATE_PRODUCT:
            let data = action.productData;
            const newProduct = new ProductModel(data.id, data.ownerId, data.title, data.imageUrl, data.description, data.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.availableProducts.concat(newProduct),
            };

        case UPDATE_PRODUCT:
            let {productData, productId} = action;
            const product = state.userProducts.find(prod => prod.id === productId);
            const newProductModel = new ProductModel(productId, product.ownerId, productData.title, productData.imageUrl, productData.description, product.price);
            const updatedProducts = [...state.userProducts];
            const availableProducts = [...state.availableProducts];
            updatedProducts[state.userProducts.findIndex(prod => prod.id === productId)] = newProductModel;
            availableProducts[state.availableProducts.findIndex(prod => prod.id === productId)] = newProductModel;
            return {...state, availableProducts: availableProducts, userProducts: updatedProducts};

    }

    return state;
}