
export const fetchQuestions = async () => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const questions = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/form/getQuestions`, {
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
				return res.questions;
			})
	return questions ? questions : [];
}

export const postAnswers = async (answers: any) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return null;
	}

	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/form/postQuestions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			body: JSON.stringify(answers)
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			})
	return response ? response : null;
}
