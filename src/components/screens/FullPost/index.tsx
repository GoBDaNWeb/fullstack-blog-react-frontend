// * react 
import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {IComment, IPostData} from './types'

// * redux 
import {useSelector} from 'react-redux'
import {selectIsAuth} from '@redux/auth/selectors'

// * axios
import axios from '../../../axios'

// * components
import Post from '@components/common/Post';
import AddComment from './AddComment'
import CommentsBlock from "./CommentsBlock";


const FullPost: React.FC = () => {
	const isAuth = useSelector(selectIsAuth)

	const [post, setPost] = useState<IPostData>()
	const [comments, setComments] = useState<IComment[]>([])

	const {id} = useParams()

	const fetchPost = async (): Promise<void> => {
		try {
			const {data} = await axios.get(`/posts/${id}`)
			setPost(data)
		} catch (error) {
			console.warn(error);
			alert('Ошибка при получении статьи')
		}
	}

	const fetchComments = async (): Promise<void> => {
		try {
			const {data} = await axios.get(`/comments/get-comments/${id}`)
			setComments(data)
		} catch (error) {
			console.warn(error);
			alert('Ошибка при получении комментариев')
		}
	}
	
	useEffect((): void => {
		fetchPost()
		fetchComments()
	}, [])

	if (!post) {
		return <>Загрузка....</>
	}

	return (
		<>
			<Post
				id={post._id}
				title={post.title}
				imageUrl={post.imageUrl && `${process.env.REACT_APP_API_URL}${post.imageUrl}`}
				author={post.author}
				createdAt={post.createdAt}
				viewsCount={post.viewsCount}
				tags={post.tags}
				isFullPost
				isLoading={!post ? true : false}
				isEditable
			>	
				<ReactMarkdown children={post.text} />
			</Post>
			<CommentsBlock
				comments={comments}
				isLoading={!comments ? true : false}
			>
				{
					isAuth &&
					<AddComment />
				}
			</CommentsBlock>
		</>
	);
};

export default FullPost