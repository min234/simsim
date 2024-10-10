import { SET_MEMO } from '../actions/types';

const initialState = {
  memo: [], // 초기 상태를 설정합니다.
};

const memoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMO:
      return { ...state, memo: action.payload };
    default:
      return state;
  }
};

export default memoReducer;
