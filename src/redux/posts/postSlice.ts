// * redux 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {PostStatus, PostItems, PostState} from './types'

// * axios
import axios from '../../axios'

export const fetchAllPosts = createAsyncThunk<PostItems[]>('posts/fetchAllPosts', async () => {
    const {data} = await axios.get('/posts/all')
    return data
})

export const fetchPopularPosts = createAsyncThunk<PostItems[]>('posts/fetchPopularPosts', async () => {
    const {data} = await axios.get('/posts/popular')
    return data
})

export const fetchPostsByTags = createAsyncThunk<PostItems[], string>('posts/fetchPostsByTags', async (id) => {
    const {data} = await axios.get(`/tags/${id}`)
    return data as PostItems[]
})

export const fetchTags = createAsyncThunk<string[]>('tags/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk<PostItems[],string>('tags/fetchRemovePost', async (id) => await axios.delete(`/posts/${id}`))

const initialState: PostState = {
    posts: {
        items: [],
        status: PostStatus.LOADING
    },
    popularPosts: {
        items: [],
        status: PostStatus.LOADING
    },
    postsByTags: {
        items: [],
        status: PostStatus.LOADING
    },
    tags: {
        items: [],
        status: PostStatus.LOADING
    },
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.posts.status = PostStatus.LOADING
        })
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload
            state.posts.status = PostStatus.SUCCESS
        })
        builder.addCase(fetchAllPosts.rejected, (state) => {
            state.posts.items = []
            state.posts.status = PostStatus.ERROR
        })
        
        builder.addCase(fetchPopularPosts.pending, (state) => {
            state.popularPosts.status = PostStatus.LOADING
        })
        builder.addCase(fetchPopularPosts.fulfilled, (state, action) => {
            state.popularPosts.items = action.payload
            state.popularPosts.status = PostStatus.SUCCESS
        })
        builder.addCase(fetchPopularPosts.rejected, (state) => {
            state.popularPosts.items = []
            state.popularPosts.status = PostStatus.ERROR
        })
        
        builder.addCase(fetchPostsByTags.pending, (state) => {
            state.postsByTags.status = PostStatus.LOADING
        })
        builder.addCase(fetchPostsByTags.fulfilled, (state, action) => {
            state.postsByTags.items = action.payload
            state.postsByTags.status = PostStatus.SUCCESS
        })
        builder.addCase(fetchPostsByTags.rejected, (state) => {
            state.postsByTags.items = []
            state.postsByTags.status = PostStatus.ERROR
        })
        
        builder.addCase(fetchTags.pending, (state) => {
            state.tags.status = PostStatus.LOADING
        })
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload
            state.tags.status = PostStatus.SUCCESS
        })
        builder.addCase(fetchTags.rejected, (state) => {
            state.tags.items = []
            state.tags.status = PostStatus.ERROR
        })
       
        builder.addCase(fetchRemovePost.pending, (state, action) => {
            state.tags.status = PostStatus.LOADING
            state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
        })
    }
})

export const postsReducer = postsSlice.reducer