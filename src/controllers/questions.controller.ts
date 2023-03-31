import { OptionI, QuestionI } from '@/lib/interfaces';

export const fetchQuestions = async () => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const questions = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/question/getQuestions`, {
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

export const fetchOptions = async (id: number) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const options = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/question/getOptions/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res.answers;
			})
	
	console.log(options)
	return options ? options : [];
}

export const createQuestion = async (question: QuestionI) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/question/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			body: JSON.stringify(question)
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			})
	return response ? response : [];
}

export const updateQuestion = async (question: QuestionI, qid: string) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const payload = {
		question: question.question,
	}
	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/question/updateQuestion/${qid}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			body: JSON.stringify(payload)
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			})
	return response ? response : [];
}

export const updateOption = async (option: OptionI, oid: string | number) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const payload = {
		option: option.option,
		iscorrect: option.iscorrect
	}
	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/question/updateAnswer/${oid}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			body: JSON.stringify(payload)
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				return res;
			})
	return response ? response : [];
}

export const deleteQuestion = async (id: number) => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/question/deleteQuestion/${id}`, {
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
			})
	return response ? response : [];
}