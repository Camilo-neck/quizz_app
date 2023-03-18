export const checkUser = ( email: string, password: string ) => {
	const userInfo = JSON.parse(localStorage.getItem('users') || '').find((user: { email: string, password: string }) => user.email === email && user.password === password);
	if (userInfo) {
		const loggedUser = {
			id: userInfo.id,
			name: userInfo.first_name + ' ' + userInfo.surname,
			role: userInfo.rol_id
		}
		return loggedUser;
	}
	return false;
};

