import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userInfo: {
			id: null,
			name: null,
			role: null,
		},
		isLoading: false,
		isError: null
		// ...
	},
	reducers: {
		setUserId (state, action) {
			state.userInfo.id = action.payload;
		},
		setUserName (state, action) {
			state.userInfo.name = action.payload;
		},
		setUserRole (state, action) {
			state.userInfo.role = action.payload;
		},
		setUser (state, action) {
			state.userInfo.name = action.payload.name;
			state.userInfo.role = action.payload.role;
		},
		updateUser (state, action) {
			state.userInfo = { ...state.userInfo, ...action.payload };
		},
		clearUser (state) {
			state.userInfo.id = null;
			state.userInfo.name = null;
			state.userInfo.role = null;
		},
		setUserLoading (state, action) {
			state.isLoading = action.payload;
		},
		setUserError (state, action) {
			state.isError = action.payload;
		}
}
});

// Action creators are generated for each case reducer function
export const { 
	setUser, setUserId, setUserName, setUserRole, updateUser, clearUser,
	setUserLoading, setUserError
} = userSlice.actions;
export const selectUser = (state: { user: {
	userInfo: { name: any; email: any; age: number; };
	isLoading: boolean;
	isError: null;
} }) => state.user;
export default userSlice.reducer;