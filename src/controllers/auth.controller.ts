import { setUserName, setUserEmail } from "@redux/slices/user.slice";
import { removeUser } from "@redux/thunks/user.thunk";

export const loginUser = (data: {email: string; password:string;}): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	localStorage.setItem('user', JSON.stringify(data));
	dispatch(setUserName(data.email.split("@")[0]));
	dispatch(setUserEmail(data.email));
	console.log('done')
}

export const logoutUser = (): any => async (dispatch: (arg0: { payload: any; type: string; }) => void)=> {
	localStorage.removeItem('user');
	dispatch(removeUser());
}