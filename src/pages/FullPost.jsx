// * react 
import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// * axios
import axios from '../axios'

// * components
import Post from "../components/Post";
import AddComment from "../components/AddComment";
import CommentsBlock from "../components/CommentsBlock";

export default function FullPost() {
	const [post, setPost] = useState()
	const [comments, setComments] = useState([])

	const {id} = useParams()
	console.log(post);
	console.log(comments);
	useEffect(() => {
		const fetch = async () => {
			try {
				const responsePost = await axios.get(`/posts/${id}`)
				const responseComments = await axios.get(`/get-comments/${id}`)
				setPost(responsePost.data)
				setComments(responseComments.data)
			} catch (error) {
				console.warn(error);
				alert('Ошибка при получении статьи')
			}
		}
		fetch()
	}, [])

	return (
		<>
			<Post
				id={post?._id}
				title={post?.title}
				imageUrl={post?.imageUrl ? `http://localhost:1818${post?.imageUrl}` : ''}
				user={post?.author}
				createdAt={post?.createdAt}
				viewsCount={post?.viewsCount}
				tags={post?.tags}
				isFullPost
				isLoading={!post ? true : false}
			>	
				<ReactMarkdown children={post?.text} />
			</Post>
			<CommentsBlock
				comments={comments}
				isLoading={!comments ? true : false}
			>
				<AddComment />
			</CommentsBlock>
		</>
	);
};
