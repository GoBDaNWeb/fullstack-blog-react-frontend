// * react
import React from 'react';
import {useForm} from 'react-hook-form'
import {Navigate} from 'react-router-dom'

// * redux 
import { useSelector} from 'react-redux'
import {useAppDispatch} from '../redux/store'
import {fetchRegister} from '../redux/auth/authSlice'
import {selectIsAuth} from '../redux/auth/selectors'
import {AuthRegisterParams} from '../redux/auth/types'

// * styles/MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import "../styles/modules/register/index.css";

const Register: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useAppDispatch()

	const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange'
	})

	const onSubmit = async (value: AuthRegisterParams): Promise<void> => {
		const data = await dispatch(fetchRegister(value))
		if (!data.payload) {
			return alert('Не удалось авторизоваться')
		}
	}

	if (isAuth) {
		return <Navigate to='/'/>
	}

	return (
		<Paper classes={{ root: 'register' }}>
			<Typography 
				classes={{ root: 'title' }} 
				variant="h5"
			>
				Создание аккаунта
			</Typography>
			<div className='avatar'>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField 
					className='field' 
					label="Полное имя" 
					type='text'
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('fullName', {required: 'Укажите полное имя'})}
					fullWidth 
				/>
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
					disabled={!isValid}
					type='submit'
					size="large" 
					variant="contained" 
					fullWidth
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};

export default Register