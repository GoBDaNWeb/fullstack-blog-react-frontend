// * react
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {Link, Navigate, useNavigate, useParams} from'react-router-dom'
import {IOptionsData} from './types'

// * axios
import axios from '../../../axios'

// * redux
import { useSelector} from 'react-redux'
import {selectIsAuth} from '@redux/auth/selectors'

// * styles/MUI
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import "@styles/modules/addPost/index.css";

const AddPost: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)
	const navigate = useNavigate()
	const {id} = useParams()
	
	const [text, setText] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [tags, setTags] = useState<string>('')
	const [imageUrl, setImageUrl] = useState<string>('')
	const inputFileRef = useRef<HTMLInputElement>(null)

	const isEditing = Boolean(id)

	const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement> ): Promise<void> => {
		try {
			if (!e.target.files) {
				return
			}
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

	const onClickRemoveImage = (): void => {
		setImageUrl('')
	}

	const onChange = useCallback((value: string): void => {
		setText(value)
	}, [])

	const onSubmit = async (): Promise<void> => {
		try {
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

	const fetchAndSetPost = async (): Promise<void> => {
		const {data: postData} = await axios.get(`/posts/${id}`)
		setTitle(postData.title)
		setText(postData.text)
		setImageUrl(postData.imageUrl)
		setTags(postData.tags.join(','))
	}

	useEffect((): void => {
		if (id) {
			fetchAndSetPost()
		}
	}, [])
	
	const options = useMemo<IOptionsData>(() => (
		{
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
		} 
	), []);
 
	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/'/>
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button 
				onClick={() => inputFileRef.current?.click()}
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

export default AddPost