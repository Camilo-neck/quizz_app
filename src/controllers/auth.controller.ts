import { setUser, setUserLoading, setUserError } from "@redux/slices/user.slice";
import { checkUser } from "@utils/auth.utils";
import { removeUser } from "@redux/thunks/user.thunk";
import jwtDecode from 'jwt-decode';

export const loginUser = (data: {email: string; password:string;}): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(setUserError(null));
	dispatch(setUserLoading(true));
	const user = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(res => {
		if(res.error) {
			dispatch(setUserError(res.error));
			return null;
		}
		return res;
	})
	if (user) {
		const { token, state, msg, ...userWithoutToken } = user;
		const decodedToken: any = jwtDecode(token);
		console.log('decodedToken', decodedToken)
		console.log(new Date(decodedToken.exp * 1000).toUTCString())
		document.cookie = `token=${token}; max-age=${ decodedToken.exp * 1000}; path=/`;
		dispatch(setUser(userWithoutToken));
	}

	dispatch(setUserLoading(false));
}

export const logoutUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	localStorage.removeItem('user');
	dispatch(removeUser());
}