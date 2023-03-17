import { setUser, clearUser, setUserLoading } from "@redux/slices/user.slice";

export const fetchUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(setUserLoading(true));
	const user = localStorage.getItem('user');
	console.log(user)
	if (user) {
		console.log('in')
		dispatch(setUser(JSON.parse(user)));
	}
	dispatch(setUserLoading(false));
}

export const removeUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(clearUser());
	console.log('done')
}