// * react
import React, {useEffect, useState} from 'react';

// * redux
import {useSelector} from 'react-redux'
import {useAppDispatch} from '@redux/store'
import {selectPosts} from '@redux/posts/selectors'
import {fetchAllPosts, fetchPopularPosts, fetchTags} from '@redux/posts/postSlice'

// * styles
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

// * components
import TagsBlock from '@components/common/TagsBlock';
import AllPosts from './AllPosts';
import PopularPosts from './PopularPosts';

function a11yProps(index: number) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
}

const Home: React.FC = () => {
	const [value, setValue] = useState<number>(0)

	const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
		setValue(newValue);
	  };	

	const dispatch = useAppDispatch()
	const { tags } = useSelector(selectPosts)

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
					<AllPosts value={value}/>
					<PopularPosts value={value}/>
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