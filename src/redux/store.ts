// * redux
import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import {postsReducer} from './posts/postSlice'
import {authReducer} from './auth/authSlice'

export const store = configureStore({
    reducer: {
        post: postsReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();