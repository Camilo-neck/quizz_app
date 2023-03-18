import { setUser, setUserLoading, setUserError } from "@redux/slices/user.slice";
import { checkUser } from "@utils/auth.utils";
import { removeUser } from "@redux/thunks/user.thunk";

export const loginUser = (data: {email: string; password:string;}): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(setUserError(null));
	dispatch(setUserLoading(true));
	const user = checkUser(data.email, data.password);
	if (user) {
		console.log(user)
		localStorage.setItem('user', JSON.stringify(user));
		dispatch(setUser(user));
	} else {
		console.log('Invalid email or password')
		dispatch(setUserError('Invalid email or password'));
	}

	dispatch(setUserLoading(false));
}

export const logoutUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	localStorage.removeItem('user');
	dispatch(removeUser());
}