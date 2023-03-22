import { UserI } from "@/lib/interfaces";

export const getUsers = async () => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const users = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/getUsers`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				console.log(res)
				return res.users;
			})
	return users ? users : [];
}

export const addUser = async (user: UserI) => {
	const users = await getUsers();
	localStorage.setItem('users', JSON.stringify([...users, user]));
}

export const deleteUser = async (id: number) => {
	const users = await getUsers();
	localStorage.setItem('users', JSON.stringify(users.filter((user: UserI) => user.id !== id)));
}

export const updateUser = async (user: UserI) => {
	const users = await getUsers();
	localStorage.setItem('users', JSON.stringify(users.map((u: UserI) => u.id === user.id ? user : u)));
}
