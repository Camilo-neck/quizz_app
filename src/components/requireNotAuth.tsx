import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { fetchUser } from "@/redux/thunks/user.thunk";

import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";

const RequireNotAuth = ({children}: {children: React.ReactElement}) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	if (user.userInfo.id) {
		return <Navigate to={location.state?.from ? location.state.from : '/'} />;
	}

	return children; 
};

export default RequireNotAuth;