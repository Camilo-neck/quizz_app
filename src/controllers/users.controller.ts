export const getUsers = () => {
	const users = JSON.parse(localStorage.getItem('users') || '');
	return users ? users : [];
}