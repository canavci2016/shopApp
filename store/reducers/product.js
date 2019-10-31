import PRODUCT from '../../data/dummy-data';
import {DELETE_PRODUCT} from "../actions/product";

const initialState = {
    availableProducts: PRODUCT,
    userProducts: PRODUCT.filter(product => product.ownerId === 'u1'),
};


export default (state = initialState, action) => {

    switch (action.type) {
        case  DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId),

            };
    }

    return state;
}