import PRODUCT from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCT,
    userProducts: PRODUCT.filter(product => product.id === 'u1'),
};


export default (state = initialState) => {


    return state;
}