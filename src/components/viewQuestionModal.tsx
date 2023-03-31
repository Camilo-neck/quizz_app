import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { OptionI } from '@/lib/interfaces';
import { fetchOptions } from '@/controllers/questions.controller';


export default function ViewQuestionModal({ isOpen, questionData, onClose}: { isOpen: boolean, questionData?: any, onClose: () => void}) {
	const [ options, setOptions ] = useState<OptionI[]>([]);

	useEffect(()=> {
		async function f() {
			const options = await fetchOptions(questionData.id);
			console.log('options', options)
			setOptions(options);
		}
		f();
	}, [])


	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>Detalle de Pregunta</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Visualiza a detalles la pregunta y sus opciones.
				</DialogContentText>
				<div className="flex flex-col gap-3 p-5">
					<div className='p-2 border border-neutral-500 rounded-lg'>
						<p className='text-lg font-semibold'>Pregunta</p>
						<hr className='border border-neutral-300' />
						<p className='ml-5 mt-1'>{questionData.question}</p>
					</div>
					<div className='p-2 border border-neutral-500 rounded-lg'>
						<p className='text-lg font-semibold'>Opciones</p>
						<hr className='border border-neutral-300' />
						<div className='flex flex-col gap-2 ml-5 mt-1'>
							{options.map((option, index) => (
								<p key={option.id}><span className='font-bold text-xl'>·</span> {option.option}</p>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Aceptar</Button>
			</DialogActions>
		</Dialog>
	);
}
