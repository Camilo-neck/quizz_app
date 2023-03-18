import Layout from '@/components/layout';
import { getUsers } from '@/controllers/users.controller';
import { shuffleArray } from '@/utils/others.utils';
import React, { useEffect } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { GridCellEditStopParams } from '@mui/x-data-grid';
import { MuiEvent } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';

const Students = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	const [students, setStudents] = React.useState<any[]>([]);
	const [ rows, setRows ] = React.useState<any[]>([]);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 70, editable: true },
		{ field: 'first_name', headerName: 'Primer Nombre', width: 130, editable: true },
		{ field: 'second_name', headerName: 'Segundo nombre', width: 130, editable: true },
		{ field: 'surname', headerName: 'Primer apellido', width: 130, editable: true },
		{ field: 'second_surname', headerName: 'Segundo apellido', width: 130, editable: true },
		{ field: 'email', headerName: 'Correo', width: 130, editable: true },
		{ field: 'rol_id', headerName: 'Rol', width: 130, editable: true },
		{ field: 'type_document', headerName: 'Tipo de documento', width: 130, editable: true },
		{ field: 'document_number', headerName: 'Documento', width: 130, editable: true },
		{ field: 'phone', headerName: 'Teléfono', width: 130, editable: true },
		{ field: 'state', headerName: 'Estado', width: 130, valueGetter: (params) => params.row.state ? 'Activo' : 'Inactivo' },
	]

	useEffect(() => {
		if (user.userInfo.role !== 'profesor'){
			navigate('/')
		}
		setStudents(getUsers())
	}, []);

	useEffect(() => {
		setRows(students)
	}, [students]);

	return (
		<Layout>
			<>
				<p className='text-4xl font-bold text-[#3D2E16] mt-10 text-center'>Gestión de Estudiantes</p>
				<div className='flex flex-col items-center h-[70vh] w-full mt-10'>
					<DataGrid
						columns={columns}
						rows={rows}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 10,
								},
							},
						}}
						pageSizeOptions={[5, 10, 20]}
						onCellEditStop={(e: GridCellEditStopParams, params: MuiEvent) => {
							// e is the event
							// e.row is the user
							// Update the users list
							setStudents((prev: any) => {
								const index = prev.findIndex((user: any) => user.id === e.row.id);
								// prev is readonly, so we need to create a new array
								const newUsers = [...prev];
								newUsers[index] = e.row;
								return newUsers;
							});
						}}
						checkboxSelection
						disableRowSelectionOnClick
					/>
				</div>
				<Button onClick={() => console.log(rows)} variant='contained' color='primary' className='mt-10'>Guardar</Button>
			</>
		</Layout>
	);
};

export default Students;