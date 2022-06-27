// * redux 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// * axios
import axios from '../../axios'

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
    const {data} = await axios.get('/posts/all')
    return data
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
    const {data} = await axios.get('/posts/popular')
    return data
})

export const fetchPostsByTags = createAsyncThunk('posts/fetchPostsByTags', async (id) => {
    const {data} = await axios.get(`/tags/${id}`)
    return data
})

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('tags/fetchRemovePost', async (id) => await axios.delete(`/posts/${id}`))

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    popularPosts: {
        items: [],
        status: 'loading'
    },
    postsByTags: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: { },
    extraReducers: {
        [fetchAllPosts.pending]: (state) => {
            state.posts.status = 'loading'
        },
        [fetchAllPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchAllPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchPopularPosts.pending]: (state) => {
            state.popularPosts.status = 'loading'
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.popularPosts.items = action.payload
            state.popularPosts.status = 'loaded'
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.popularPosts.items = []
            state.popularPosts.status = 'error'
        },
        [fetchPostsByTags.pending]: (state) => {
            state.postsByTags.status = 'loading'
        },
        [fetchPostsByTags.fulfilled]: (state, action) => {
            state.postsByTags.items = action.payload
            state.postsByTags.status = 'loaded'
        },
        [fetchPostsByTags.rejected]: (state) => {
            state.postsByTags.items = []
            state.postsByTags.status = 'error'
        },
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.tags.status = 'loading'
            state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postsSlice.reducer