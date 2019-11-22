import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getStateFunc) => {
        const userId = getStateFunc().auth.userId;
        try {
            const response = await fetch('https://map-api-1531502761988.firebaseio.com/products.json');
            const resData = await response.json();
            const loadedProducts = [];
            for (const key in resData) {
                const product = resData[key];
                loadedProducts.push(new Product(key, product.ownerId, product.title, product.imageUrl, product.description, product.price));
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        } catch (e) {
            throw  e;
        }
    };
};

export const deleteProduct = productId => {
    return async dispatch => {
        await fetch(`https://map-api-1531502761988.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
        });
        dispatch({type: DELETE_PRODUCT, productId: productId});
    };
};

export const createProduct = (title, description, price, imageUrl) => {
    return async (dispatch, getStateFunc) => {
        const userId = getStateFunc().auth.userId;
        const response = await fetch('https://map-api-1531502761988.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, price, imageUrl, ownerId: userId}),
        });
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {id: resData.name, title, description, price, imageUrl, ownerId: userId}
        });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getStateFunc) => {
        const token = getStateFunc().auth.token;
        console.log(token);
        console.log(id);
        try {
            const response = await fetch(`https://map-api-1531502761988.firebaseio.com/products/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, description, imageUrl}),
            });

            if (!response.ok) {
                const responseData = await response.json();
                let message = responseData.error ? responseData.error : 'Something went wrong';
                throw  new Error(message);
            }

            dispatch({type: UPDATE_PRODUCT, productId: id, productData: {title, description, imageUrl}});
        } catch (e) {
            throw  e;
        }
    };
};