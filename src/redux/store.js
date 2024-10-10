import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './rootReducer'; 


const persistConfig = {
  key: 'root',
  storage, 
};

// persistReducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // 루트 리듀서를 설정합니다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 직렬화 검사 비활성화
    }),
});

const persistor = persistStore(store);

export { store, persistor };
