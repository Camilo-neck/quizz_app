import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userInfo: {
			name: null,
			email: null,
			age: 42,
		},
		isLoading: false,
		isError: null
		// ...
	},
	reducers: {
		setUserName (state, action) {
			state.userInfo.name = action.payload;
		},
		setUserAge (state, action) {
			state.userInfo.age = action.payload;
		},
		setUserEmail (state, action) {
			state.userInfo.email = action.payload;
		},
		setUser (state, action) {
			state.userInfo.name = action.payload.email.split("@")[0];
			state.userInfo.email = action.payload.email;
		},
		updateUser (state, action) {
			state = { ...state, ...action.payload };
		},
		clearUser (state) {
			state.userInfo.name = null;
			state.userInfo.email = null;
			state.userInfo.age = 0;
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
	setUser, setUserAge, setUserName, setUserEmail, updateUser, clearUser,
	setUserLoading, setUserError
} = userSlice.actions;
export const selectUser = (state: { user: {
	userInfo: { name: any; email: any; age: number; };
	isLoading: boolean;
	isError: null;
} }) => state.user;
export default userSlice.reducer;