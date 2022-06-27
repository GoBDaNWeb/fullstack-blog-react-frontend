// * react
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {Link, Navigate, useNavigate, useParams} from'react-router-dom'

// * axios
import axios from '../axios'

// * redux
import { useSelector} from 'react-redux'
import {selectIsAuth} from '../redux/slices/auth'

// * styles/MUI
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import "../styles/modules/addPost/index.css";

export default function AddPost() {
	const isAuth = useSelector(selectIsAuth)
	const navigate = useNavigate()
	const {id} = useParams()

	const [isLoading, setLoading] = useState(false)
	const [text, setText] = useState('')
	const [title, setTitle] = useState('')
	const [tags, setTags] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const inputFileRef = useRef(null)

	const isEditing = Boolean(id)

	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			const {data} = await axios.post('/upload', formData)
			setImageUrl(data.url)
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onChange = useCallback((value) => {
		setText(value)
	}, [])

	const onSubmit = async () => {
		try {
			setLoading(true)

			const fields = {
				title,
				imageUrl,
				text,
				tags
			}

			const {data} = isEditing 
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields)

			const _id = isEditing ? id : data._id
			navigate(`/posts/${_id}`)
		} catch (err) {
			console.warn(err);
			alert('Ошибка при создании статьи')
		}
	}

	useEffect(() => {
		if (id) {
			axios.get(`/posts/${id}`).then(({data}) => {
				setTitle(data.title)
				setText(data.text)
				setImageUrl(data.imageUrl)
				setTags(data.tags.join(','))
			}).catch(err => {
				console.warn(err);
				alert('Ошибка при получении статьи')
			})
		}
	}, [])

	const options = useMemo(() => (
		{
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}
	), []);
 
	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/'/>
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button 
				onClick={() => inputFileRef.current.click()}
				variant="outlined" 
				size="large"
			>
				Загрузить превью
			</Button>
			<input 
				ref={inputFileRef}
				onChange={handleChangeFile}
				type="file"  
				hidden 
			/>
			{
				imageUrl && (
					<>
						<Button 
							onClick={onClickRemoveImage}
							variant="contained" 
							color="error" 
						>
							Удалить
						</Button>
						<img 
							className='image'
							src={`http://localhost:1818${imageUrl}`} 
							alt="Uploaded" 
						/>
					</>
				)
			}
			<br />
			<br />
			<TextField
				classes={{ root: 'title' }}
				variant="standard"
				placeholder="Заголовок статьи..."
				value={title}
				onChange={e => setTitle(e.target.value)}
				fullWidth
			/>
			<TextField 
				classes={{ root: 'tags' }} 
				variant="standard" 
				placeholder="Тэги" 
				value={tags}
				onChange={e => setTags(e.target.value)}
				fullWidth 
			/>
			<SimpleMDE 
				className='editor' 
				value={text} 
				onChange={onChange} 
				options={options} 
			/>
			<div className='buttons'>
				<Button 
					onClick={() => onSubmit()}
					size="large" 
					variant="contained"
				>
				{isEditing ? 'Обновить' : 'Опубликовать'}
				</Button>
				<Link to={'/'}>
					<Button size="large">
						Отмена
					</Button>
				</Link>
			</div>
		</Paper>
	);
};
