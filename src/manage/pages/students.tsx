import Layout from '@/components/layout';
import { getUsers, updateUser } from '@/controllers/users.controller';
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
		{ field: 'id', headerName: 'ID', headerClassName: "bg-[#FFDDAF]", width: 70, editable: true },
		{ field: 'first_name', headerName: 'Primer Nombre', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'second_name', headerName: 'Segundo nombre', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'surname', headerName: 'Primer apellido', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'second_surname', headerName: 'Segundo apellido', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'email', headerName: 'Correo', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'rol_id', headerName: 'Rol', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'type_document', headerName: 'Tipo de documento', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'document_number', headerName: 'Documento', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'phone', headerName: 'Teléfono', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
		{ field: 'state', headerName: 'Estado', headerClassName: "bg-[#FFDDAF]", width: 130, valueGetter: (params) => params.row.state ? 'Activo' : 'Inactivo' },
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

	const processRowUpdate = React.useCallback(
		(newRow) => {
			setStudents((prev: any) => {
				const index = prev.findIndex((user: any) => user.id === newRow.id);
				// prev is readonly, so we need to create a new array
				const newUsers = [...prev];
				newUsers[index] = { ...newUsers[index], ...newRow };
				return newUsers;
			});
			updateUser(newRow);
		},
		[setStudents],
	);

	return (
		<Layout>
			<>
				<p className='text-4xl font-bold text-[#3D2E16] mt-10 text-center'>Gestión de Estudiantes</p>
				<div className='flex flex-col items-center h-[70vh] w-screen mt-10'>
					<div className="self-center w-[90vw] h-full">
						<DataGrid
							columns={columns}
							rows={rows}
							editMode='row'
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 10,
									},
								},
							}}
							pageSizeOptions={[5, 10, 20]}
							processRowUpdate={processRowUpdate}
							onProcessRowUpdateError={(error) => console.log(error)}
							onCellEditStop={(params: GridCellEditStopParams) => {
								console.log(params);
							}}
							checkboxSelection
							disableRowSelectionOnClick
						/>
					</div>
				</div>
				{/*<Button onClick={() => console.log(rows)} variant='contained' color='primary' className='mt-10'>Guardar</Button>*/}
			</>
		</Layout>
	);
};

export default Students;
