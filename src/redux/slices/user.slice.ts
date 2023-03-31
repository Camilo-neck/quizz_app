import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		userInfo: {
			id: null,
			name: null,
			second_name: null,
			surname: null,
			second_surname: null,
			typeDocument:null, 
			document_number: null,
			email: null,
			role: null,
			phone:null, 
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
			state.userInfo.id = action.payload.id;
			state.userInfo.name = action.payload.firstName;
			state.userInfo.second_name = action.payload.secondName;
			state.userInfo.surname = action.payload.surname;
			state.userInfo.second_surname = action.payload.secondSurName;
			state.userInfo.typeDocument = action.payload.typeDocument;
			state.userInfo.document_number = action.payload.documentNumber;
			state.userInfo.email = action.payload.email;
			state.userInfo.phone = action.payload.phone;
			state.userInfo.role = action.payload.rol;

		},
		updateUser (state, action) {
			state.userInfo = { ...state.userInfo, ...action.payload };
		},
		clearUser (state) {
			state.userInfo.id = null;
			state.userInfo.name = null;
			state.userInfo.second_name = null;
			state.userInfo.surname = null;
			state.userInfo.second_surname = null;
			state.userInfo.typeDocument = null;
			state.userInfo.document_number = null;
			state.userInfo.email = null;
			state.userInfo.phone = null;
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
	userInfo: { id: number; name: string; role: string; };
	isLoading: boolean;
	isError: string;
} }) => state.user;
export default userSlice.reducer;
