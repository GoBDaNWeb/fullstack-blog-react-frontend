// * react 
import React from 'react';
import {Link} from 'react-router-dom'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '@redux/auth/authSlice'
import {selectIsAuth} from '@redux/auth/selectors'

// * styles/MUI
import Button from '@mui/material/Button';
import '@styles/modules/header/index.css';
import Container from '@mui/material/Container';

const Header: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)

	const dispatch = useDispatch()

  	const onClickLogout = (): void => {
		dispatch(logout())
		window.localStorage.removeItem('token')
	}

	return (
		<div className='header'>
			<Container maxWidth="lg">
				<div className='inner'>
					<Link 
						to={'/'} 
						className='logo'
					>
						<div>FULLSTACK BLOG</div>
					</Link>
					<div className='buttons'>
					{
						isAuth 
						? (
						<>
							<Link to={'/create-post'}>
								<Button variant="contained">
									Написать статью
								</Button>
							</Link>
							<Button 
								onClick={onClickLogout} 
								variant="contained" 
								color="error"
							>
								Выйти
							</Button>
						</>
						) 
						: (
							<>
								<Link to={'/login'}>
									<Button variant="outlined">
										Войти
									</Button>
								</Link>
								<Link to={'/register'}>
									<Button variant="contained">
										Создать аккаунт
									</Button>
								</Link>
							</>
						)
					}
					</div>
				</div>
			</Container>
		</div>
	);
};


export default Header