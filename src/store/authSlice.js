import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    status_redux: false,
    user: null,
}
const authSlice = createSlice({ 
    name: 'auth_names', 
    initialState, 
    reducers: { 
        loginReducer: (state, action) => {
            state.status_redux = true;
            state.user = action.payload;
        },
        logoutReducer: (state) => {
            state.status_redux = false;  
            state.user = null;
        },
    }, 
});
export const {loginReducer, logoutReducer} = authSlice.actions;
export default authSlice.reducer;  