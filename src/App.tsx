// * react 
import React, {useEffect} from 'react'
import { Routes, Route} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {useAppDispatch} from './redux/store'
import {fetchAuth} from './redux/auth/authSlice'
import {selectIsAuth} from './redux/auth/selectors'

// * styles/MUI
import Container from "@mui/material/Container";

// * components
import Header from "./components/Header";
import HomePage from './pages/Home'
import FullPostPage from './pages/FullPost'
import RegisterPage from './pages/Register'
import AddPostPage from './pages/AddPost'
import LoginPage from './pages/Login'
import PostByTagsPage from "./pages/PostByTags";

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchAuth())
	}, [])

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path='/' element={<HomePage />}/>
					<Route path='/tags/:id' element={<PostByTagsPage />}/>
					<Route path='/posts/:id' element={<FullPostPage />}/>
					<Route path='/posts/:id/edit' element={<AddPostPage />}/>
					<Route path='/create-post' element={<AddPostPage />}/>
					<Route path='/login' element={<LoginPage />}/>
					<Route path='/register' element={<RegisterPage />}/>
				</Routes>
			</Container>
		</>
	);
}

export default App;
