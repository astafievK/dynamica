import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/api.ts';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from "../api/slices/authSlice.ts";
import modalLoginSlice from "../api/slices/modalLoginSlice.ts";
import modalNotificationsSlice from "../api/slices/modalNotificationsSlice.ts";
import mobileMenuSlice from "../api/slices/mobileMenuSlice.ts";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        baseApi.reducerPath,
        'modalLoginReducer',
        'modalNotificationsReducer',
        'mobileMenuReducer',
    ],
};

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    modalLoginReducer: modalLoginSlice,
    modalNotificationsReducer: modalNotificationsSlice,
    mobileMenuReducer: mobileMenuSlice,
    auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(baseApi.middleware),
    });

    const persistor = persistStore(store);

    setupListeners(store.dispatch);

    return { store, persistor };
};

export const { store, persistor } = setupStore();
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;