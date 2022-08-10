// * react 
import React, {useEffect} from "react";
import {useParams} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {useAppDispatch} from '../../../redux/store'
import {fetchPostsByTags} from '../../../redux/posts/postSlice'
import {selectPosts} from '../../../redux/posts/selectors'
import {selectAuthData} from '../../../redux/auth/selectors'

// * styles/MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../../../styles/modules/postByTags/index.css';

// * components
import Post from "../../Post";
import TagsBlock from '../../TagsBlock';


type PostData  = {
	_id: string,
	title: string,
	text: string,
	tags: string[],
	viewsCount: number,
	author: Record<string, string>,
	imageUrl: string,
	createdAt: string
}

const PostByTags: React.FC = () => {
    const dispatch = useAppDispatch()

	const { postsByTags, tags } = useSelector(selectPosts)
	const userData = useSelector(selectAuthData)

	const isPostsByTagsLoading: boolean = postsByTags.status === 'loading'
	const isTagsLoading: boolean = tags.status === 'loading'

	const {id} = useParams()
	const fetch = async (): Promise<void> => {
		dispatch(fetchPostsByTags(String(id)))
	}
	
	useEffect((): void => {
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
							).map((post: PostData, index: number) => (
								<Post
									id={post?._id}
									key={index}
									title={post?.title}
									imageUrl={post?.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
									author={post?.author}
									createdAt={post?.createdAt}
									viewsCount={post?.viewsCount}
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

export default PostByTags