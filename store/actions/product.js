import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {

    return async dispatch => {
        try {
            const response = await fetch('https://map-api-1531502761988.firebaseio.com/products.json');
            const resData = await response.json();

            const loadedProducts = [];
            for (const key in resData) {
                const product = resData[key];
                loadedProducts.push(new Product(key, 'u1', product.title, product.imageUrl, product.description, product.price));
            }

            dispatch({type: SET_PRODUCTS, products: loadedProducts});

        } catch (e) {
            throw  e;
        }
    };
};

export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT, productId: productId}
};

export const createProduct = (title, description, price, imageUrl) => {
    return async dispatch => {
        const response = await fetch('https://map-api-1531502761988.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, price, imageUrl}),
        });

        const resData = await response.json();

        dispatch({type: CREATE_PRODUCT, productData: {id: resData.name, title, description, price, imageUrl}});
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return {type: UPDATE_PRODUCT, productId: id, productData: {title, description, imageUrl}}
};