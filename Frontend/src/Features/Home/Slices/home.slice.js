import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        userPosts: [],
        singlePost: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setPosts: (state, action) => {
            state.posts = action.payload?.filter(post => post && post._id) || [];
        },
        addPostToState: (state, action) => {
            state.posts.unshift(action.payload)
        },
        setUserPosts: (state, action) => {
            state.userPosts = action.payload?.filter(post => post && post._id) || [];
        },

        setSinglePost: (state, action) => {
            state.singlePost = action.payload;
        },
        updatePosts: (state, action) => {
            const updated = action.payload
            if (updated && updated._id) {
                state.posts = state.posts.map((post) =>
                    post && post._id === updated._id ? updated : post
                )
                state.userPosts = state.userPosts.map((post) =>
                    post && post._id === updated._id ? updated : post
                );
                if (state.singlePost && state.singlePost._id === updated._id) {
                    state.singlePost = updated;
                }
            }
        }
    }
})


export const {
    setLoading,
    setError,
    setPosts,
    addPostToState,
    setUserPosts,
    setSinglePost,
    updatePosts,
} = postSlice.actions;

export default postSlice.reducer;