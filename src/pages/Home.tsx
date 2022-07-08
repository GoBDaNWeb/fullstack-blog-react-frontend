// * react
import React, {useEffect, useState} from 'react';

// * redux
import {useSelector} from 'react-redux'
import {useAppDispatch} from '../redux/store'
import {selectPosts} from '../redux/posts/selectors'
import {selectAuthData} from '../redux/auth/selectors'
import {fetchAllPosts, fetchPopularPosts, fetchTags} from '../redux/posts/postSlice'


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

type TabPanelType = {
	children?: React.ReactNode[],
	index: number,
	value: number
}

function TabPanel(props: TabPanelType) {
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
				<Typography component="div">{children}</Typography>
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


function a11yProps(index: number) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
}

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

const Home: React.FC = () => {
	const [value, setValue] = useState<number>(0)

	const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
		setValue(newValue);
	  };	

	const dispatch = useAppDispatch()
	const { posts, popularPosts, tags } = useSelector(selectPosts)
	const userData = useSelector(selectAuthData)

	const isPostsLoading: boolean = posts.status === 'loading'
	const isPopularPostsLoading: boolean = popularPosts.status === 'loading'
	const isTagsLoading: boolean = tags.status === 'loading'
	
	useEffect((): void => {
		dispatch(fetchAllPosts())
		dispatch(fetchPopularPosts())
	}, [value])

	useEffect((): void => {
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
					<TabPanel value={value} index={0}>
						{
							(
								isPostsLoading 
								? [...Array(5)]
								: posts.items
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
					</TabPanel>
					<TabPanel value={value} index={1}>
						{
							(
								isPopularPostsLoading 
								? [...Array(5)]
								: popularPosts.items
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

export default Home