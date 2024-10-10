// actions/numberActions.js
import { SET_NUMBER, RESET_NUMBER, DECREMENT_NUMBER } from './types';

export const setNumber = (number) => ({
  type: SET_NUMBER,
  payload: number,
});


