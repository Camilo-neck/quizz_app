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
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return;
	}

	const reponse = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			body: JSON.stringify(user)
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			}
		)
	return reponse ? reponse : null;
}

export const deleteUser = async (id: number) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return;
	}
	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/delete/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			}
		)
	return response ? response : {};
}

export const updateUser = async (user: UserI, uid: string | number) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return;
	}
	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/update/${uid}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			body: JSON.stringify(user)
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			}
		)
	return response ? response : {};
}
