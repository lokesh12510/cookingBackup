import * as actionTypes from './actionTypes';

export const cartLoading = (loading) => {
    return {
        type: actionTypes.CART_LOADING,
        payload: {
            loading: loading,
        },
    };
};

export const cartPopup = (status) => {
    return {
        type: actionTypes.CART_POPUP,
        payload: {
            popup: status,
            previewId: null,
        },
    };
};

export const cartUpdate = (payload) => {
    return {
        type: actionTypes.CART_UPDATE,
        payload: {
            ...payload,
        },
    };
};

export const cartClear = () => {
    return {
        type: actionTypes.CART_CLEAR,
        payload: {
            cartItems: [],
        },
    };
};

export const cartItemAdd = (item) => {
    return {
        type: actionTypes.CART_ITEM_ADD,
        payload: {
            ...item,
        },
    };
};

export const cartItemUpdate = (item) => {
    return {
        type: actionTypes.CART_ITEM_UPDATE,
        payload: {
            ...item,
        },
    };
};

export const cartItemDelete = (item) => {
    return {
        type: actionTypes.CART_ITEM_DELETE,
        payload: {
            ...item,
        },
    };
};

export const cartItemQtyPlus = (item) => {
    return {
        type: actionTypes.CART_ITEM_QTY_PLUS,
        payload: {
            ...item,
        },
    };
};

export const cartItemQtyMinus = (item) => {
    return {
        type: actionTypes.CART_ITEM_QTY_MINUS,
        payload: {
            ...item,
        },
    };
};
