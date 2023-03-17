import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { fetchUser } from "@/redux/thunks/user.thunk";

import { Navigate } from "react-router";

const RequireNotAuth = ({children}: {children: React.ReactElement}) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	if (user.userInfo.email) {
		return <Navigate to="/" />;
	}

	return children; 
};

export default RequireNotAuth;