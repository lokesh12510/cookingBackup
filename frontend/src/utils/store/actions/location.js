import * as actionTypes from './actionTypes';
import * as commonHelper from '../../helpers/commonHelper';

export const locationPopup = (status) => {
    return {
        type: actionTypes.POPUP_LOCATION,
        payload: {
            popup: status,
        },
    };
};

export const updateLocation = (location) => {
    localStorage.setItem('location', JSON.stringify(location));
    return {
        type: actionTypes.UPDATE_LOCATION,
        payload: {
            latitude: location.latitude || null,
            longitude: location.longitude || null,
            address: location.address || null,
        },
    };
};

export const deleteLocation = () => {
    localStorage.removeItem('location');
    return {
        type: actionTypes.DELETE_LOCATION,
    };
};

export const loadLocation = () => {
    return dispatch => {
        let location = localStorage.getItem('location');
        if(location && location !== null)
        {
            location = commonHelper.parseJSON(location);
            if(location && location.latitude && location.longitude)
            {
                dispatch(updateLocation({
                    latitude: location.latitude || null,
                    longitude: location.longitude || null,
                    address: location.address || null,
                }));
            }
            else
            {
                dispatch(deleteLocation());
            }
        }
    };
};
