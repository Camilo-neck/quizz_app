export const getUsers = () => {
	const users = JSON.parse(localStorage.getItem('users') || '');
	return users ? users : [];
}

export const addUser = (user: any) => {
	const users = getUsers();
	localStorage.setItem('users', JSON.stringify([...users, user]));
}

export const deleteUser = (id: number) => {
	const users = getUsers();
	localStorage.setItem('users', JSON.stringify(users.filter((user: any) => user.id !== id)));
}

export const updateUser = (user: any) => {
	const users = getUsers();
	localStorage.setItem('users', JSON.stringify(users.map((u: any) => u.id === user.id ? user : u)));
}
