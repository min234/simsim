// reducers/imgdataReducer.js
import { SET_IMGDATA, INC_PLAYERS, DEC_PLAYERS } from '../actions/types';
import { image } from '../../imageFile/Home';

const initialState = {
    data: image.slice(0, 2),
    playerCount: 2,
    players: [],
};

const imgdataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMGDATA:
            return { ...state, data: action.payload };

        case INC_PLAYERS: {
            const newPlayerCount = state.playerCount + 1;
            return {
                ...state,
                playerCount: newPlayerCount,
                data: image.slice(0, newPlayerCount),
            };
        }

        case DEC_PLAYERS: {
            const newPlayerCount = Math.max(2, state.playerCount - 1);
            return {
                ...state,
                playerCount: newPlayerCount,
                data: image.slice(0, newPlayerCount),
            };
        }

        default:
            return state;
    }
};

export default imgdataReducer;
