// reducers/userReducer.js
import { SET_USER_DETAILS, SET_LOADING, SET_ERROR, RESET_STATE, SET_SUCCESS, SET_LOGIN } from '../actions/types';

const initialState = {
    userDetails: {
        email: '',
        password: '',
        id: '',
        name: ''
    },
    isLoading: false,
    error: null,
    success: false,
    login:false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    ...action.payload,
                },
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case RESET_STATE:
            return initialState;
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload,
            };
            case SET_LOGIN:
                return{
                    ...state,
                    login:action.payload
                }
        default:
            return state;
    }
};

export default userReducer;
