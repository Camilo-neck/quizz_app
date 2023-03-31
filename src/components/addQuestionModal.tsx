import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { OptionI, QuestionI, UserI } from '@/lib/interfaces';
import { fetchRoles } from '@/controllers/roles.controller';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { fetchDocumentTypes } from '@/controllers/document.controller';
import { fetchOptions } from '@/controllers/questions.controller';

const initialState: any = {
	question: '',
	options: [{
		option: '',
		id: undefined,
	}, {
		option: '',
		id: undefined,
	}, {
		option: '',
		id: undefined,
	}, {
		option: '',
		id: undefined,
	}],
	correct_option: '', // option1, option2, option3, option4
}

export default function AddUpdateQuestionModal({ isOpen, isUpdate, questionData, onClose, onSubmit }: { isOpen: boolean, isUpdate: boolean, questionData?: any, onClose: () => void, onSubmit: (data: QuestionI) => void }) {
	const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({mode:'onChange', defaultValues: isUpdate ? {...initialState, question: questionData.question} : initialState});
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(()=> {
		async function f() {
			const options = await fetchOptions(questionData.id);
			console.log('options', options[0].option)
			const initialData = {
				question: questionData.question,
				options: options.map((option) => ({option: option.option, id: option.id})),
				correct_option: '',
			}
			console.log('initialData', initialData)
			reset(initialData);
		}
		if (isUpdate) {
			f();
		} 
		// f();
	}, [])


	const handleSubmitForm = (data: any) => {
		console.log('data', data)
		const tmpData: QuestionI = {question: data.question, options: []};
		tmpData.options = data.options.map((option: OptionI, index: number) => (
			{
				...option,
				iscorrect: data.correct_option === `option${index + 1}`,
			}
		))
		onSubmit(tmpData);
		handleClose();
	}


	const handleClose = () => {
		reset({...initialState});
		onClose();
	};


	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>{ !isUpdate ? 'Crear Pregunta' : 'Actualizar pregunta'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Para {!isUpdate ? 'crear una nueva': 'actualizar una'} pregunta, debe llenar completamente el siguiente formulario.
				</DialogContentText>
				<form ref={formRef} onSubmit={handleSubmit(handleSubmitForm)}>
					<TextField
						autoFocus
						margin="dense"
						id="question"
						label="Enunciado de la pregunta"
						type="text"
						fullWidth
						{...register('question', { required: true })}
					/>
					<RadioGroup className='p-5 border rounded-lg mt-3 w-full'>
						<FormControlLabel value="option1" control={<Radio />} {...register('correct_option', {required:true})} label={<TextField
								margin="dense"
								id="option1"
								label="Opción 1"
								type="text"
								size='small'
								InputLabelProps={{ shrink: true }}
								fullWidth
								{...register('options.0.option', { required: true })}
							/>} 
						/>
						<FormControlLabel value="option2" control={<Radio />} {...register('correct_option', {required:true})} label={<TextField
								margin="dense"
								id="option2"
								label="Opción 2"
								type="text"
								size='small'
								InputLabelProps={{ shrink: true }}
								fullWidth
								{...register('options.1.option', { required: true })}
							/>} 
						/>
						<FormControlLabel value="option3" control={<Radio />} {...register('correct_option', {required:true})} label={<TextField
								margin="dense"
								id="option3"
								label="Opción 3"
								type="text"
								size='small'
								InputLabelProps={{ shrink: true }}
								fullWidth
								{...register('options.2.option', { required: true })}
							/>} 
						/>
						<FormControlLabel value="option4" control={<Radio />} {...register('correct_option', {required:true})} label={<TextField
								margin="dense"
								id="option4"
								label="Opción 4"
								type="text"
								size='small'
								InputLabelProps={{ shrink: true }}
								fullWidth
								{...register('options.3.option', { required: true })}
							/>} 
						/>
					</RadioGroup>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={() => {console.log('click'); formRef.current.requestSubmit(); console.log('submitted')}}>{isUpdate ? 'Actualizar' : 'Crear'}</Button>
			</DialogActions>
		</Dialog>
	);
}
