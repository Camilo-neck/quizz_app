import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout';

import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { fetchQuestions, postAnswers } from '@/controllers/form.controller'; 
import { useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/user.slice';
import { useNavigate } from "react-router-dom";


const Form = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	const formRef = useRef(null);
	const [ questions, setQuestions ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ errorSnackbarOpen, setErrorSnackbarOpen ] = useState(false);
	const [ successSnackbarOpen, setSuccessSnackbarOpen ] = useState(false);
	const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

	useEffect(() => {
		if (user.userInfo.role !== 'Estudiante') {
			navigate('/');
		}
		async function f() {
			const res = await fetchQuestions();
			setQuestions(res);
			console.log(res);
			setIsLoading(false);
		}
		f();
	}, []);

	useEffect(() => {
		console.log(Object.values(errors));
		if (Object.values(errors).length > 0) {
			setErrorSnackbarOpen(true);
		}
	}, [errors]);

	const onSubmit = async (data) => {
		const answers = [];
		for (let answer in data) {
			answers.push(data[answer]);
		}
		const body = {
			answers,
			estudianteId: user.userInfo.id
		};
		await postAnswers(body);
		setSuccessSnackbarOpen(true);
	};

	if (isLoading) {
		return (
			<Layout>
				<div className='flex justify-center items-center'>
					<CircularProgress />
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="flex justify-center items-center">
				<Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={() => setErrorSnackbarOpen(false)}>
					<Alert onClose={() => {
						setErrorSnackbarOpen(false)
						navigate('/');
					}} severity="error" sx={{ width: '100%' }}>
						Error al enviar el formulario. Por favor, revise que haya contestado todas las preguntas.
					</Alert>
				</Snackbar>
				<Snackbar open={successSnackbarOpen} autoHideDuration={6000} onClose={() => setSuccessSnackbarOpen(false)}>
					<Alert onClose={() => {
						setSuccessSnackbarOpen(false)
						navigate('/');
					}} severity="success" sx={{ width: '100%' }}>
						Enhorabuena, exámen enviado con éxito.
					</Alert>
				</Snackbar>
				<div className="flex flex-col w-full px-10">
					<div className="flex flex-col gap-1 my-5 text-center">
						<p className="font-bold text-3xl">Presenta tu exámen</p>
						<p className="italic">Responde todas las preguntas correctamente</p>
					</div>
					<form className="flex flex-col gap-10 mb-5" ref={formRef} onError={() => setErrorSnackbarOpen(true)} onSubmit={handleSubmit(onSubmit)}>
						{
							questions.map((question, indexQ) => (
								<div key={indexQ} className="w-full border border-zinc-300 rounded-lg p-5">
									<p>{question.question}</p>
									<RadioGroup>
										{
											question.options.map((option, indexO) => (
												<FormControlLabel
													value={option.id}
													control={<Radio />}
													label={option.option}
													{...register(`question-${indexQ}`, {required: "Debe contestar esta todas las preguntas."})}
												/>
											))
										}
									</RadioGroup>
								</div>
							))
						}
						<Button type="submit" disabled={successSnackbarOpen} variant="outlined" color="primary" onClick={() => {
							try {
								formRef.current.requestSubmit()
							} catch (e) {
								console.log(e);
							}
						}}>
							Enviar
						</Button>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Form;
