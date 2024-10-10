import { combineReducers } from 'redux';
import memoReducer from './reducers/MemoReducer'; // 메모 리듀서를 가져옵니다.
import userReducer from './reducers/UserReducers';
import numberReducer from './reducers/NumberReducer';
import imgdataReducer from './reducers/ImgdataReducer';

const rootReducer = combineReducers({
  memo: memoReducer,
  user:userReducer,
  number:numberReducer,
  data:imgdataReducer,
});

export default rootReducer;
