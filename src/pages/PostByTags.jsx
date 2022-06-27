// * react 
import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {fetchPostsByTags} from '../redux/slices/posts'

// * axios
import axios from '../axios'

// * styles/MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../styles/modules/postByTags/index.css';

// * components
import Post from "../components/Post";
import TagsBlock from '../components/TagsBlock';

export default function PostByTags() {
	const [posts, setPosts] = useState()
    const dispatch = useDispatch()

	const { postsByTags, tags } = useSelector(state => state.posts)
	const userData = useSelector(state => state.auth.data)

	const isPostsByTagsLoading = postsByTags.status === 'loading'
	const isTagsLoading = tags.status === 'loading'

	const {id} = useParams()
	const fetch = async () => {
		console.log(id)
		const data = await dispatch(fetchPostsByTags(id))
		setPosts(data.payload)
	}
	
	useEffect(() => {
		fetch()
	}, [id])

	return (
		<>
			<Typography 
				variant="h5"
				classes={{root: 'title'}}
			>
				#{id}
			</Typography>
            <Grid 
				container 
				spacing={4}
			>
				
				<Grid 
					xs={8} 
					item
				>
						{
							(
								isPostsByTagsLoading 
								? [...Array(5)]
								: postsByTags.items
							).map((post, index) => (
								<Post
									id={post?._id}
									key={index}
									title={post?.title}
									imageUrl={post?.imageUrl ? `http://localhost:1818${post.imageUrl}` : ''}
									user={post?.author}
									createdAt={post?.createdAt}
									viewsCount={post?.viewsCount}
									commentsCount={3}
									tags={post?.tags}
									isEditable={userData?._id === post?.author._id}
									isLoading={!post ? true : false}
								/>
							))
						}
				</Grid>
                <Grid 
					xs={4} 
					item
				>
					<div style={{ position: "fixed", width: '25%' }}>
						<TagsBlock 
							items={tags.items} 
							isLoading={isTagsLoading} 
						/>
					</div>
				</Grid>
			</Grid>
		</>
	);
};
