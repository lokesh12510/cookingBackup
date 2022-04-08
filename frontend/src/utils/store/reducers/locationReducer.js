import * as actionTypes from '../actions/actionTypes';

const initialState = {
    popup: false,
    latitude: null,
    longitude: null,
    address: null,
};

const locationUpdate = (state, action) => {
    return { ...state, ...action.payload };
};

const locationDelete = (state) => {
    return { ...state, ...initialState };
};


// reducer
const reducer = ( state = initialState, action ) => {
    switch(action.type)
    {
        case actionTypes.POPUP_LOCATION: return locationUpdate(state, action);
        case actionTypes.UPDATE_LOCATION: return locationUpdate(state, action);
        case actionTypes.DELETE_LOCATION: return locationDelete(state);
        default: 
            return state;
    }
};

export default reducer;