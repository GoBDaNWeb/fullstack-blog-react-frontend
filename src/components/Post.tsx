// * react
import React from 'react';
import {Link} from 'react-router-dom'

// * redux 
import {useAppDispatch} from '../redux/store'
import {fetchRemovePost} from '../redux/posts/postSlice'

// * styles/MUI
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import '../styles/modules/post/index.css';

// * components
import UserInfo from './UserInfo';
import PostSkeleton from './Skeleton';

type PostProps = {
	id: string,
	title: string,
	createdAt: string,
	imageUrl: string,
	author: Record<string, string>,
	viewsCount: number,
	tags: string[],
	children?: React.ReactNode,
	isFullPost?: boolean,
	isLoading?: boolean,
	isEditable?: boolean
}

const Post: React.FC<PostProps> = ({id,title,createdAt,imageUrl,author,viewsCount,tags,children,isFullPost,isLoading,isEditable}) => {
	const dispatch = useAppDispatch()

	const onClickRemove = (): void => {
		if (window.confirm('Вы действительно хотите удалить статью?')) {
			dispatch(fetchRemovePost(id))
		}
	}

	if (isLoading) {
		return <PostSkeleton />
	}

	return (
		<div className={`post ${ isFullPost ? 'postFull': '' }`}>
			{isEditable && (
				<div className='editButtons'>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton 
						onClick={onClickRemove} 
						color="secondary"
					>
						<DeleteIcon />
					</IconButton>
				</div>
				)}
				{
					imageUrl && (
						<img
							className={`image ${isFullPost ? 'imageFull' : '' }`}
							src={imageUrl}
							alt={title}
						/>
					)
				}
			<div className='wrapper'>
				<UserInfo {...author} additionalText={createdAt} />
				<div className='indention'>
					<h2 className={`title ${isFullPost ? 'titleFull' : '' }`}>
						{
							isFullPost 
							? title 
							: <Link to={`/posts/${id}`}>
								{title}
							</Link>
						}
					</h2>
					<ul className='tags'>
					{
						tags.map((name) => (
							<li key={name}>
								<Link to={`/tags/${name}`}>#{name}</Link>
							</li>
						))
					}
					</ul>
					{
						children && 
						<div className='content'>
							{children}
						</div>
					}
					<ul className='postDetails'>
						<li>
							<EyeIcon />
							<span>
								{viewsCount}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Post