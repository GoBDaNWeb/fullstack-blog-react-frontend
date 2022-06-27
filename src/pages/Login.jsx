// * react 
import React from "react";
import {useForm} from 'react-hook-form'
import {Navigate} from 'react-router-dom'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {fetchLogin, selectIsAuth} from '../redux/slices/auth'

// * styles/MUI
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../styles/modules/login/index.css";

export default function Login() {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()

	const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = async (value) => {
		const data = await dispatch(fetchLogin(value))
		if (!data.payload) {
			return alert('Не удалось авторизоваться')
		}

		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/'/>
	}

	return (
		<Paper classes={{ root: 'login' }}>
			<Typography 
				classes={{ root: 'title' }} 
				variant="h5"
			>
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className='field'
					label="E-Mail"
					type='email'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', {required: 'Укажите почту'})}
					fullWidth
				/>
				<TextField 
					className='field'
					label="Пароль"
					type='password'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', {required: 'Укажите пароль'})}
					fullWidth 
				/>
				<Button 
					type='submit'
					size="large" 
					variant="contained" 
					fullWidth
				>
					Войти
				</Button>
			</form>
		</Paper>
	);
};