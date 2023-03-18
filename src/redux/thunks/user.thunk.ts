import { setUser, clearUser, setUserLoading } from "@redux/slices/user.slice";

export const fetchUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(setUserLoading(true));
	const user = JSON.parse(localStorage.getItem('user') || '' ) ;
	if (user) {
		dispatch(setUser(user));
		return user
	}
	dispatch(setUserLoading(false));
	return null
}

export const removeUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(clearUser());
	console.log('done')
}