// * redux 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {AuthStatus, AuthDataType, AuthState, AuthLoginParams, AuthRegisterParams} from './types'

// * axios
import axios from '../../axios'

export const fetchLogin = createAsyncThunk<AuthDataType, AuthLoginParams>('auth/fetchLogin', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data
})

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
    const {data} = await axios.get('/auth/me')
    return data
})

export const fetchRegister = createAsyncThunk<any, AuthRegisterParams>('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params)
    return data
})

const initialState: AuthState = {
    data: null,
    status: AuthStatus.LOADING

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            state.data = null
            state.status = AuthStatus.LOADING
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = AuthStatus.LOADING
            state.data = null
        })
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = AuthStatus.SUCCESS
        })
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null
            state.status = AuthStatus.ERROR
        })

        builder.addCase(fetchLogin.pending, (state) => {
            state.status = AuthStatus.LOADING
            state.data = null
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = AuthStatus.SUCCESS
            if (action.payload.token) {
				window.localStorage.setItem('token', action.payload.token)
			}
        })
        builder.addCase(fetchLogin.rejected, (state) => {
            state.data = null
            state.status = AuthStatus.ERROR
        })

        builder.addCase(fetchRegister.pending, (state) => {
            state.data = null
            state.status = AuthStatus.LOADING
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = AuthStatus.SUCCESS
            if (action.payload.token) {
				window.localStorage.setItem('token', action.payload.token)
			}
        })
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null
            state.status = AuthStatus.ERROR
        })
    }
})

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions