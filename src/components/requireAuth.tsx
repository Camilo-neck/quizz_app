import { selectUser } from "@/redux/slices/user.slice";
import { fetchUser } from "@/redux/thunks/user.thunk";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

const RequireAuth = ({children}: {children: React.ReactElement}) => {
	// const user = JSON.parse(localStorage.getItem('user') || '{}');
	const user = useSelector(selectUser)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	if (!user.userInfo.email) {
		return <Navigate to="/auth/login" />;
	}


	return children; 
};

export default RequireAuth;