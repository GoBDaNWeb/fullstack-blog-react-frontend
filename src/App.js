// * react 
import {useEffect} from 'react'
import { Routes, Route} from 'react-router-dom'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {fetchAuth, selectIsAuth} from './redux/slices/auth'

// * styles/MUI
import Container from "@mui/material/Container";

// * components
import Header from "./components/Header";
import Home from './pages/Home'
import FullPost from './pages/FullPost'
import Register from './pages/Register'
import AddPost from './pages/AddPost'
import Login from './pages/Login'
import PostByTags from "./pages/PostByTags";

function App() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	useEffect(() => {
		dispatch(fetchAuth())
	}, [])

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/tags/:id' element={<PostByTags />}/>
					<Route path='/posts/:id' element={<FullPost />}/>
					<Route path='/posts/:id/edit' element={<AddPost />}/>
					<Route path='/create-post' element={<AddPost />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/register' element={<Register />}/>
				</Routes>
			</Container>
		</>
	);
}

export default App;
