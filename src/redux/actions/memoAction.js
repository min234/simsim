import { SET_MEMO } from './types';

export const setMemo = (memo) => ({
  type: SET_MEMO,
  payload: memo,
});