// * react
import React, {useEffect, useState} from 'react';

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllPosts, fetchPopularPosts, fetchTags} from '../redux/slices/posts'

// * styles
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// * components
import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
			<Box sx={{ p: 3 }}>
				<Typography>{children}</Typography>
			</Box>
			)}
		</div>
	);
}
  
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};


function a11yProps(index) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function Home() {
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue);
	  };	

	const dispatch = useDispatch()
	const { posts, popularPosts, tags } = useSelector(state => state.posts)
	const userData = useSelector(state => state.auth.data)

	const isPostsLoading = posts.status === 'loading'
	const isPopularPostsLoading = popularPosts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'
	
	useEffect(() => {
		dispatch(fetchAllPosts())
		dispatch(fetchPopularPosts())
	}, [value])

	useEffect(() => {
		dispatch(fetchTags())
	}, [])

	return (
		<>
			<Tabs 
				value={value} 
				onChange={handleChange} 
				style={{ marginBottom: 15 }} 
				aria-label="basic tabs example"
			>
				<Tab 
					{...a11yProps(0)}
					label="Новые" 
				/>
				<Tab 
					{...a11yProps(1)}
					label="Популярные" 
				/>
			</Tabs>
			<Grid 
				container 
				spacing={4}
			>
				
				<Grid 
					xs={8} 
					item
				>
					<TabPanel value={value} index={0} className='heh'>
						{
							(
								isPostsLoading 
								? [...Array(5)]
								: posts.items
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
					</TabPanel>
					<TabPanel value={value} index={1}>
						{
							(
								isPopularPostsLoading 
								? [...Array(5)]
								: popularPosts.items
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
					</TabPanel>
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
