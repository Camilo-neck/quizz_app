import { selectUser } from "@/redux/slices/user.slice";
import { fetchUser } from "@/redux/thunks/user.thunk";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";

const RequireAuth = ({children}: {children: React.ReactElement}) => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		(async () => {
			await dispatch(fetchUser())
		})();
	}, [])

	if (!user.userInfo.id) {
		return <Navigate state={{from: location.pathname}} to="/auth/login" />;
	}


	return children; 
};

export default RequireAuth;