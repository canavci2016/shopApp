import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {
    return async (dispatch, getStateFunc) => {
        const userId = getStateFunc().auth.userId;
        try {
            const response = await fetch(`https://map-api-1531502761988.firebaseio.com/orders/${userId}.json`);
            const resData = await response.json();
            const loadedOrders = [];
            for (const key in resData) {
                const order = resData[key];
                loadedOrders.push(new Order(key, order.cartItems, order.totalAmount, new Date(order.date)));
            }
            dispatch({type: SET_ORDERS, orders: loadedOrders});
        } catch (e) {
            throw  e;
        }
    };
};


export const addOrder = (cartItems, totalAmount) => {

    return async (dispatch, getStateFunc) => {
        const userId = getStateFunc().auth.userId;
        const date = new Date();
        const response = await fetch(`https://map-api-1531502761988.firebaseio.com/orders/${userId}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cartItems, totalAmount, date: date.toISOString()}),
        });

        const resData = await response.json();

        if (!response.ok) {
            throw  new Error(resData.error);
        }

        dispatch({type: ADD_ORDER, orderData: {id: resData.name, items: cartItems, amount: totalAmount, date}});
    };
};

