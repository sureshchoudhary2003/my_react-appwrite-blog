import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPostsReducer: (state, action) => {
            state.posts = action.payload;
        },

        addPostReducer: (state, action) => {
            state.posts.push(action.payload);
        },

        updatePostReducer: (state, action) => {
            const updatedPost = action.payload;

            state.posts = state.posts.map((post) =>
                post.$id === updatedPost.$id ? updatedPost : post
            );
        },

        deletePostReducer: (state, action) => {
            const postId = action.payload;

            state.posts = state.posts.filter(
                (post) => post.$id !== postId
            );
        },

        startLoadingReducer: (state) => {
            state.loading = true;
        },

        stopLoadingReducer: (state) => {
            state.loading = false;
        },
    },
});

export const {
    setPostsReducer,
    addPostReducer,
    updatePostReducer,
    deletePostReducer,
    startLoadingReducer,
    stopLoadingReducer,
} = postSlice.actions;

export default postSlice.reducer;