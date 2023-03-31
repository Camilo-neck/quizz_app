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
	typeDocument: 0,
	documentNumber: '',
	password: '',
	rol: 2,
	phone: '',
}

export default function AddUpdateStudentModal({ isOpen, isUpdate, userData, onClose, onSubmit }: { isOpen: boolean, isUpdate: boolean, userData?: UserI, onClose: () => void, onSubmit: (data: UserI) => void }) {
	const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: isUpdate ? userData : initialState});
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

	useEffect(() => {
		console.log(isUpdate, userData)
	}, [userData])

	const handleSubmitForm = (data: UserI) => {
		console.log('submit')
		console.log(data)
		onSubmit(data);
		handleClose();
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		reset({...initialState});
		onClose();
	};

	console.log(watch('rol'));

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>{ !isUpdate ? 'Crear Usuario' : 'Actualizar usuario'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Para {!isUpdate ? 'crear un nuevo': 'actualizar un'} usuario, debe llenar completamente el siguiente formulario.
				</DialogContentText>
				<form ref={formRef} onSubmit={handleSubmit(handleSubmitForm)}>
					<TextField
						autoFocus
						margin="dense"
						id="firstname"
						label="Primer Nombre"
						type="text"
						fullWidth
						{...register('firstName', { required: "Debe ingresar el primer nombre" })}
						error={!!errors.firstName}
						helperText={`${errors.firstName ? errors.firstName?.message : ''}`}
					/>
					<TextField
						margin="dense"
						id="secondname"
						label="Segundo Nombre"
						type="text"
						fullWidth
						{...register('secondName', { required: "Debe ingresar el segundo nombre" })}
						error={!!errors.secondName}
						helperText={`${ errors.secondName ? errors.secondName?.message : ''}`}
					/>
					<TextField
						margin="dense"
						id="surname"
						label="Primer Apellido"
						type="text"
						fullWidth
						{...register('surname', { required: "Debe ingresar el primer apellido" })}
						error={!!errors.surname}
						helperText={`${ errors.surname ? errors.surname?.message : ''}`}
					/>
					<TextField
						margin="dense"
						id="secondsurname"
						label="Segundo Apellido"
						type="text"
						fullWidth
						{...register('secondSurName', { required: "Debe ingresar el segundo apellido" })}
						error={!!errors.secondSurName}
						helperText={`${ errors.surname ? errors.secondSurName?.message : ''}`}
					/>
					<TextField
						margin="dense"
						id="email"
						label="Correo Electrónico"
						type="email"
						fullWidth
						{...register('email', { 
							required: "Debe ingresar el correo electrónico", 
							pattern: { 
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
								message: "Debe ingresar un correo electrónico válido" 
							} 
						})}
						error={!!errors.email}
						helperText={`${ errors.email ? errors.email?.message : ''}`}
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
								{...register('typeDocument', { required: "Debe ingresar el tipo de documento" })}
								error={!!errors.typeDocument}
							>
								{documentTypes.map((dType) => (
									<MenuItem key={dType.id} value={dType.id}>{dType.name}</MenuItem>
								))}
							</Select>
							<p className="text-xs text-red-600 ml-2">{ errors.typeDocument ? errors.typeDocument?.message : ''}</p>
						</FormControl>
						<TextField
							margin="dense"
							id="documentnumber"
							label="Número de Documento"
							type="text"
							fullWidth
							{...register('documentNumber', { 
								required: "Debe ingresar el número de documento", 
								minLength: { 
									value: 6, 
									message: "El número de documento debe tener al menos 6 caracteres" 
								} 
							})}
							error={!!errors.documentNumber}
							helperText={`${ errors.documentNumber ? errors.documentNumber?.message : ''}`}
						/>
					</div>
					{ !isUpdate &&
					<TextField
						margin="dense"
						id="password"
						label="Contraseña"
						type="password"
						fullWidth
						{...register('password', { 
							required: "Debe ingresar la contraseña", 
							minLength: { 
								value: 6, 
								message: "La contraseña debe tener al menos 6 caracteres" 
							} 
						})}
						error={!!errors.password}
						helperText={`${ errors.password ? errors.password?.message : ''}`}
					/>
					}
					<TextField
						margin="dense"
						id="phone"
						label="Teléfono"
						type="text"
						fullWidth
						{...register('phone', { 
							required: "Debe ingresar el teléfono",
							minLength: {
								value: 7,
								message: "El teléfono debe tener al menos 7 caracteres"
							}
						})}
						error={!!errors.phone}
						helperText={`${ errors.phone ? errors.phone?.message : ''}`}
					/>

				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={() => formRef.current.requestSubmit()}>{isUpdate ? 'Actualizar' : 'Crear'}</Button>
			</DialogActions>
		</Dialog>
	);
}
