import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from '../../models/cart-item';
import {ADD_ORDER} from "../actions/order";
import {DELETE_PRODUCT} from "../actions/product";

const initialState = {
    items: {},
    totalAmount: 0,
};


export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const product = action.product;
            const {price, title, id} = product;
            const items = state.items;

            const cartItem = items[id] ? new CartItem(
                items[id].quantity + 1,
                price,
                title,
                (items[id].quantity + 1) * price
            ) : new CartItem(1, price, title, price);

            return {...state, items: {...state.items, [id]: cartItem}, totalAmount: state.totalAmount + price};

        case  REMOVE_FROM_CART:
            const productId = action.productId;
            const selectedItem = state.items[productId];
            let updatedCartItems;
            console.log(selectedItem);
            if (selectedItem.quantity > 1) {
                const UpdatedCartItem = new CartItem(selectedItem.quantity - 1, selectedItem.productPrice, selectedItem.productTitle, selectedItem.sum - selectedItem.productPrice);
                updatedCartItems = {...state.items, [productId]: UpdatedCartItem};
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[productId];
            }
            return {...state, items: updatedCartItems, totalAmount: state.totalAmount - selectedItem.productPrice}
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.productId]) {
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = updatedItems[action.productId].sum;
            delete updatedItems[action.productId];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            };


    }

    return state;
}