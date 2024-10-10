import { SET_NUMBER } from '../actions/types';

const initialState = {
  number: 0, // 초기 숫자 상태를 0으로 설정
};

const numberReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER:
      return { ...state, number: action.payload };
    default:
      return state;
  }
};

export default numberReducer;
