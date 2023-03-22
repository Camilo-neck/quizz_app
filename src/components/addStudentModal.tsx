import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { UserI } from '@/lib/interfaces';
import { fetchRoles } from '@/controllers/roles.controller';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { fetchDocumentTypes } from '@/controllers/document.controller';

const initialState: UserI = {
	firstName: '',
	secondName: '',
	surname: '',
	secondSurName: '',
	email: '',
	TypesDocument: 0,
	documentNumber: '',
	password: '',
	rol: 0,
	phone: '',
	state: true,
}

export default function AddStudentModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (data: UserI) => void }) {
	const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: initialState});
	const formRef = useRef<HTMLFormElement>(null);
	const [open, setOpen] = useState(false);
	const [ rolesOptions, setRolesOptions ] = useState<{id:number, name:string}[]>([{id:0, name:''}]);
	const [ documentTypes, setDocumentTypes ] = useState<{id:number, name:string}[]>([{id:0, name:''}]);

	useEffect(()=> {
		async function f() {
			const roles = await fetchRoles();
			setRolesOptions(roles)
			const documentTypes = await fetchDocumentTypes();
			setDocumentTypes(documentTypes)
		}
		f();
	}, [])

	const handleSubmitForm = (data: UserI) => {
		console.log('submit')
		console.log(data)
		onSubmit(data);
		
		onClose();
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	console.log(watch('rol'));

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>Crear Usuario</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Para crear un nuevo usuario, debe llenar completamente el siguiente formulario.
				</DialogContentText>
				<form ref={formRef} onSubmit={handleSubmit(handleSubmitForm)}>
					<TextField
						autoFocus
						margin="dense"
						id="firstname"
						label="Primer Nombre"
						type="text"
						fullWidth
						{...register('firstName', { required: true })}
					/>
					<TextField
						margin="dense"
						id="secondname"
						label="Segundo Nombre"
						type="text"
						fullWidth
						{...register('secondName', { required: true })}
					/>
					<TextField
						margin="dense"
						id="surname"
						label="Primer Apellido"
						type="text"
						fullWidth
						{...register('surname', { required: true })}
					/>
					<TextField
						margin="dense"
						id="secondsurname"
						label="Segundo Apellido"
						type="text"
						fullWidth
						{...register('secondSurName', { required: true })}
					/>
					<TextField
						margin="dense"
						id="email"
						label="Correo Electrónico"
						type="email"
						fullWidth
						{...register('email', { required: true })}
					/>
					<div className='flex flex-row items-center gap-2 p-1'>
						<FormControl fullWidth>
							<InputLabel id="documenttype-label">Tipo de Documento</InputLabel>
							<Select
								margin="dense"
								labelId='documenttype-label'
								id="documenttype"
								label="Tipo de Documento"
								type="text"
								fullWidth
								{...register('TypesDocument', { required: true })}
							>
								{documentTypes.map((dType) => (
									<MenuItem key={dType.id} value={dType.id}>{dType.name}</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							margin="dense"
							id="documentnumber"
							label="Número de Documento"
							type="text"
							fullWidth
							{...register('documentNumber', { required: true })}
						/>
					</div>
					<TextField
						margin="dense"
						id="password"
						label="Contraseña"
						type="password"
						fullWidth
						{...register('password', { required: true })}
					/>
					<FormControl fullWidth>
						<InputLabel id="rol-label">Rol</InputLabel>
						<Select
							labelId='rol-label'
							margin="dense"
							id="rol"
							label="Rol"
							type="text"
							fullWidth
							{...register('rol', { required: true })}
						>
							{rolesOptions.map((rol) => (
								<MenuItem key={rol.id} value={rol.id}>{rol.name}</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						margin="dense"
						id="phone"
						label="Teléfono"
						type="text"
						fullWidth
						{...register('phone', { required: true })}
					/>

				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={() => formRef.current.requestSubmit()}>Crear</Button>
			</DialogActions>
		</Dialog>
	);
}
