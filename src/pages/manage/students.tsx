import Layout from '@/components/layout';
import { getUsers, updateUser } from '@/controllers/users.controller';
import { shuffleArray } from '@/utils/others.utils';
import React, { useEffect, useState } from 'react';

import { DataGrid, GridColDef, GridRowSelectionModel, GridCellEditStopParams, MuiEvent } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';



import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { UserI } from '@/lib/interfaces';
import AddStudentModal from '@/components/addStudentModal';
import { fetchRoles } from '@/controllers/roles.controller';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', headerClassName: "bg-[#FFDDAF]", width: 70, editable: true },
  { field: 'firstName', headerName: 'Primer Nombre', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'secondName', headerName: 'Segundo nombre', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'surname', headerName: 'Primer apellido', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'secondSurName', headerName: 'Segundo apellido', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'email', headerName: 'Correo', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'rol', headerName: 'Rol', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'TypesDocument', headerName: 'Tipo de documento', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'documentNumber', headerName: 'Documento', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  { field: 'phone', headerName: 'Teléfono', headerClassName: "bg-[#FFDDAF]", width: 130, editable: true },
  {
    field: 'actions', headerName: 'Acciones', headerClassName: "bg-[#FFDDAF]", width: 130, renderCell: (params) => (
      <div className='flex justify-center'>
        <IconButton color='primary' onClick={() => console.log(params)}><ModeEditOutlineRoundedIcon /></IconButton>
        <IconButton color='error' onClick={() => console.log(params)}><DeleteOutlineRoundedIcon /></IconButton>
      </div>
    )
  },
]

const Students = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [students, setStudents] = useState<UserI[]>([]);
  const [ keyword, setKeyword ] = useState<string>('');
  const [rows, setRows] = useState<UserI[]>([]);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState<boolean>(false);


  useEffect(() => {
    if (user.userInfo.role !== 'Administrador') {
      navigate('/')
    }
    async function f() {
      console.log(await getUsers())
      setStudents(await getUsers())
      setRoles([{ id: 0, name: '' }, ...await fetchRoles()])
    }
    f()
  }, []);

  useEffect(() => {
    setRows(students)
  }, [students]);

  const filterRowsByKeyword = (keyword: string) => {
    const filteredRows = students.filter((row) => {
      return Object.keys(row).some((field) => {
        return row[field].toString().toLowerCase().includes(keyword.toLowerCase());
      });
    });
    setRows(filteredRows);
  };


  const getRoles = async () => {
    const roles = await fetchRoles();
    return roles;
  };

  const onAddStudent = (newStudent: UserI) => {
    const student: any = newStudent;
    student.id = students.length + 1;
    student.rol = newStudent.rol === 2 ? 'Estudiante' : 'Administrador';
    student.TypesDocument = (() => {
      switch (newStudent.TypesDocument) {
        case 1:
          return 'CC';
        case 2:
          return 'TI';
        case 3:
          return 'NIP';
        default:
          return 'CC';
      }
    })();
    setStudents((prev) => [...prev, newStudent]);
  };

  const clearFiltersSelected = () => {
    setRows(students);
    setSelectedRole('');
    setKeyword('');
  };

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

  useEffect(() => {
    console.log(rowSelectionModel);
  }, [rowSelectionModel]);

  return (
    <Layout>
      <>
        <AddStudentModal isOpen={isAddStudentModalOpen} onClose={() => setIsAddStudentModalOpen(false)} onSubmit={onAddStudent} />
        <p className='text-4xl font-bold text-[#3D2E16] mt-10 text-center'>Gestión de Estudiantes</p>
        <div className='flex flex-col gap-5 items-center h-[70vh] w-screen mt-10'>
          <div className="flex flex-row w-[90vw] items-center p-1 border border-zinc-400 rounded-full">
            <div className='flex flex-row gap-5 flex-grow'>
              <div className='flex items-center'>
                <IconButton color='primary' onClick={() => setIsAddStudentModalOpen(true)}> <AddCircleRoundedIcon /> </IconButton>
                <Typography className='font-semibold' color='primary'>Crear</Typography>
              </div>
              <Divider orientation='vertical' flexItem />
              <p className='self-center'>Filtrar:</p>
              <TextField className=' bg-indigo-400/10 rounded-full'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '9999px',
                  },
                }} label='Buscar por palabra clave' size='small' variant='outlined' value={keyword} onChange={(e) => {setKeyword(e.target.value);filterRowsByKeyword(e.target.value)}} />
              <FormControl>
                <InputLabel id="role-select-label">Rol</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  label="Rol"
                  className='min-w-[100px] rounded-full bg-indigo-400/10'
                  size='small'
                  sx={{
                    '& .MuiOutlinedSelect-root': {
                      borderRadius: '9999px',
                    },
                  }}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    if (e.target.value === '') {
                      setRows(students);
                      return;
                    }
                    console.log(rows)
                    const filteredRows = students.filter((row) => row.rol === e.target.value);
                    setRows(filteredRows);
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button
              variant='contained'
              startIcon={<ClearAllRoundedIcon />}
              className='rounded-full bg-[#8D437F] hover:bg-[#8d5281] active:bg-[#8D437F] focus:outline-none 
            focus:ring-2 focus:ring-[#8D437F] focus:ring-opacity-50' onClick={clearFiltersSelected}>
              Limpiar Selección
            </Button>
          </div>
          <div className="self-center w-fit max-w-[90vw] h-full">
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
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
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
