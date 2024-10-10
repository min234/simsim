// actions/userActions.js
import { SET_USER_DETAILS, SET_LOADING, SET_ERROR, RESET_STATE, SET_SUCCESS, SET_LOGIN } from './types';

export const setUserDetails = (details) => ({
    type: SET_USER_DETAILS,
    payload:{key: details},
});

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const resetState = () => ({
    type: RESET_STATE,
});

export const setSuccess = (success) => ({
    type: SET_SUCCESS,
    payload: success,
});

export const setLogin = (login) =>({
    type:SET_LOGIN,
    payload:login,
})