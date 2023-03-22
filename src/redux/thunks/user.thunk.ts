import { setUser, clearUser, setUserLoading } from "@redux/slices/user.slice";
import jwtDecode from "jwt-decode";

export const fetchUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	dispatch(setUserLoading(true));
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		dispatch(setUserLoading(false));
		return null
	}
	const decodedToken: any = jwtDecode(token.split('=')[1]);
	const id = decodedToken.id;
	const user = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/getUser/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
		},
	}).then(res => res.json()).then(res => {
		if(res.error) {
			return null;
		}
		return res.user;
	})
	console.log(user)
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