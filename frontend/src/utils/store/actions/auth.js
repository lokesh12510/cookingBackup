import * as actionTypes from './actionTypes';
import * as userService from '../../../components/site/services/userService';

export const authLoading = (loading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: {
            loading: loading,
        },
    };
};

export const authLogin = (token, user) => {
    localStorage.setItem('token', token);
    return {
        type: actionTypes.AUTH_LOGIN,
        payload: {
            isLoggedIn: true,
            token: token,
            user: user,
        },
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authUpdateUser = (user) => {
    return {
        type: actionTypes.AUTH_UPDATE_USER,
        payload: {
            user: user,
        },
    };
};

export const authCheckState = () => {
    return async dispatch => {
        dispatch(authLoading(true));
        const token = localStorage.getItem('token');
        if(token && token !== null)
        {
            dispatch(authLogin(token, {}));
            try
            {
                const response = await userService.getProfile();
                //console.log(response.data);
                dispatch(authUpdateUser(response.data.user));
                dispatch(authLoading(false));
            }
            catch(e)
            {
                dispatch(authLogout());
            }
        }
        else
        {
            dispatch(authLogout());
        }
    };
};

export const authGrantPermission = (requestedRoles, user) => {
    if(requestedRoles && user)
    {
        const permittedRoles = user.role || '';
        if(permittedRoles && permittedRoles != '')
        {
            if(requestedRoles.includes(permittedRoles))
            {
                return true;
            }
        }
    }
    return false;
};

