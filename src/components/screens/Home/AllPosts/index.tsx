// *react 
import {IPostData, ITabPanel} from '../types'

// * redux 
import {useSelector} from 'react-redux'
import {selectPosts} from '@redux/posts/selectors'
import {selectAuthData} from '@redux/auth/selectors'

// * styles 
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// * components 
import Post from '@components/common/Post'

function TabPanel(props: ITabPanel) {
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
				<Typography component="div">
					{children}
				</Typography>
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

const AllPosts = ({value}: {value: number}) => {
	const {posts} = useSelector(selectPosts)
	const userData = useSelector(selectAuthData)

	const isPostsLoading: boolean = posts.status === 'loading'

    return (
        <TabPanel 
            value={value}
            index={0}
        >
            {
                (
                    isPostsLoading 
                    ? [...Array(5)]
                    : posts.items
                ).map((post: IPostData, index: number) => (
                    <Post
                        id={post?._id}
                        key={index}
                        title={post?.title}
                        imageUrl={post?.imageUrl && `${process.env.REACT_APP_API_URL}${post.imageUrl}`}
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
    )
}

export default AllPosts