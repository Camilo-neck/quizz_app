import Layout from "@/components/layout";
import {
    getUsers,
    updateUser,
    addUser,
    deleteUser,
} from "@/controllers/users.controller";
import { shuffleArray } from "@/utils/others.utils";
import React, { useEffect, useState } from "react";

import {
    DataGrid,
    GridColDef,
    GridRowSelectionModel,
    GridCellEditStopParams,
    MuiEvent,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"

import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { useNavigate } from "react-router-dom";
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { UserI } from "@/lib/interfaces";
import AddUpdateStudentModal from "@/components/addStudentModal";
import { fetchRoles } from "@/controllers/roles.controller";
import { fetchDocumentTypes } from "@/controllers/document.controller";

const Students = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [students, setStudents] = useState<UserI[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [rows, setRows] = useState<UserI[]>([]);
    const [documentTypes, setDocumentTypes] = useState<{ id: number; name: string }[]>([]);
    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);
    const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] =
        useState<boolean>(false);
    const [isUpdateStudentModalOpen, setIsUpdateStudentModalOpen] =
        useState<boolean>(false);
	const [ successSnackbarOpen, setSuccessSnackbarOpen ] = useState<boolean>(false);
	const [ successSnackbarMessage, setSuccessSnackbarMessage ] = useState<string>(""); 
    let [toUpdateUser, setToUpdateUser] = useState<UserI>();

    useEffect(() => {
        if (user.userInfo.role !== "Administrador") {
            navigate("/");
        }
        async function f() {
            setStudents(await getUsers());
            setDocumentTypes([{ id: 0, name: "" }, ...(await fetchDocumentTypes())]);
        }
        f();
    }, []);

    useEffect(() => {
        setRows(students);
    }, [students]);

    const columns: GridColDef[] = [
        {
            field: "actions",
            headerName: "",
            headerClassName: "bg-[#FFDDAF]",
            width: 70,
            renderCell: (params) => (
                <div className="flex justify-center">
                    <IconButton
                        color="primary"
                        onClick={async () => {
                            const tempUser = Object.assign({}, params.row);
                            tempUser.rol = await roleNameToId(tempUser.rol);
                            tempUser.typeDocument = await documentTypeToId(
                                tempUser.typeDocument
                            );
                            setToUpdateUser(tempUser);
                            setIsUpdateStudentModalOpen(true);
                        }}
                    >
                        <ModeEditOutlineRoundedIcon />
                    </IconButton>
                </div>
            ),
        },
        {
            field: "id",
            headerName: "ID",
            headerClassName: "bg-[#FFDDAF]",
            width: 70,
        },
        {
            field: "firstName",
            headerName: "Primer Nombre",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "secondName",
            headerName: "Segundo nombre",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "surname",
            headerName: "Primer apellido",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "secondSurName",
            headerName: "Segundo apellido",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "email",
            headerName: "Correo",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "typeDocument",
            headerName: "Tipo de documento",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "documentNumber",
            headerName: "Documento",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
        {
            field: "phone",
            headerName: "Teléfono",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
        },
    ];

    const roleNameToId = async (roleName: string) => {
        const roles = await fetchRoles();
        const role = roles.find((role) => role.name === roleName);
        return role?.id;
    };

    const roleIdToName = async (roleId: number | string) => {
        const roles = await fetchRoles();
        const role = roles.find((role) => role.id === roleId);
        return role?.name;
    };

    const documentTypeToId = async (documentTypeName: string) => {
        const documentTypes = await fetchDocumentTypes();
        const documentType = documentTypes.find(
            (dType) => (dType.name = documentTypeName)
        );
        return documentType?.id;
    };

    const documentIdToName = async (documentTypeId: number | string) => {
        const documentTypes = await fetchDocumentTypes();
        const documentType = documentTypes.find(
            (dType) => (dType.id = documentTypeId)
        );
        return documentType?.name;
    };

    const filterRowsByKeyword = (keyword: string) => {
        const filteredRows = students.filter((row) => {
            return Object.keys(row).some((field) => {
                return row[field]
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
            });
        });
        setRows(filteredRows);
    };

    const getRoles = async () => {
        const roles = await fetchRoles();
        return roles;
    };

    const onAddStudent = async (newStudent: UserI) => {
        newStudent.rol = newStudent.rol ? newStudent.rol : 2;
        await addUser(newStudent);
        setStudents(await getUsers());
		setSuccessSnackbarOpen(true);
		setSuccessSnackbarMessage("Estudiante agregado exitosamente");
    };

    const onUpdateStudent = async (updatedStudent: UserI) => {
        const userId = students.filter(
            (student) => student.id === updatedStudent.id
        )[0].id;
        await updateUser(updatedStudent, userId);
        setStudents(await getUsers());
		setSuccessSnackbarOpen(true);
		setSuccessSnackbarMessage("Estudiante actualizado exitosamente");
    };

    const onDeleteStudent = async (studentId: number) => {
        await deleteUser(studentId);
        setStudents(await getUsers());
		setSuccessSnackbarOpen(true);
		setSuccessSnackbarMessage("Estudiante eliminado exitosamente");
    };

    const clearFiltersSelected = () => {
        setRows(students);
        setSelectedDocumentType("");
        setKeyword("");
    };

    return (
        <Layout>
            <>
				<Snackbar 
					open={successSnackbarOpen}
					autoHideDuration={6000}
					onClose={() => {
						setSuccessSnackbarOpen(false);
						setSuccessSnackbarMessage("");
					}}
					anchorOrigin={{
						vertical:'top',
						horizontal:'right'
					}}
					message={successSnackbarMessage}
				>
					<Alert severity="success" onClose={()=> {
						setSuccessSnackbarOpen(false);
						setSuccessSnackbarMessage("");
					}}
					className="w-full"
					>
						{successSnackbarMessage}
					</Alert>
				</Snackbar>
                <AddUpdateStudentModal
                    isOpen={isAddStudentModalOpen}
                    isUpdate={false}
                    onClose={() => setIsAddStudentModalOpen(false)}
                    onSubmit={onAddStudent}
                />
                {toUpdateUser && (
                    <AddUpdateStudentModal
                        isOpen={isUpdateStudentModalOpen}
                        isUpdate={true}
                        userData={toUpdateUser}
                        onClose={() => {
                            setIsUpdateStudentModalOpen(false);
                            setToUpdateUser(null);
                        }}
                        onSubmit={onUpdateStudent}
                    />
                )}
                <p className="text-4xl font-bold text-[#3D2E16] mt-10 text-center">
                    Gestión de Estudiantes
                </p>
                <div className="flex flex-col gap-5 items-center h-[70vh] w-screen mt-10">
                    <div className="flex flex-col md:flex-row w-[90vw] items-center p-1  rounded-full">
                        <div className="flex flex-row gap-5 flex-grow">
                            <div className="flex items-center">
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                        setIsAddStudentModalOpen(true)
                                    }
                                >
                                    {" "}
                                    <AddCircleRoundedIcon />{" "}
                                </IconButton>
                                <Typography
                                    className="font-semibold"
                                    color="primary"
                                >
                                    Crear
                                </Typography>
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <p className="self-center">Filtrar:</p>
                            <TextField
                                className=" bg-indigo-400/10 rounded-full"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "9999px",
                                    },
                                }}
                                label="Buscar por palabra clave"
                                size="small"
                                variant="outlined"
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                    filterRowsByKeyword(e.target.value);
                                }}
                            />
                            <FormControl>
                                <InputLabel id="role-select-label">
                                    Tipo de documento
                                </InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    value={selectedDocumentType}
                                    label="Rol"
                                    className="min-w-[200px] rounded-full bg-indigo-400/10"
                                    size="small"
                                    sx={{
                                        "& .MuiOutlinedSelect-root": {
                                            borderRadius: "9999px",
                                        },
                                    }}
                                    onChange={(e) => {
                                        setSelectedDocumentType(e.target.value);
                                        if (e.target.value === "") {
                                            setRows(students);
                                            return;
                                        }
                                        console.log(rows);
                                        const filteredRows = students.filter(
                                            (row) => row.typeDocument === e.target.value
                                        );
                                        setRows(filteredRows);
                                    }}
                                >
                                    {documentTypes.map((dt) => (
                                        <MenuItem
                                            key={dt.id}
                                            value={dt.name}
                                        >
                                            {dt.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<ClearAllRoundedIcon />}
                            className="rounded-full bg-[#8D437F] hover:bg-[#8d5281] active:bg-[#8D437F] focus:outline-none 
            focus:ring-2 focus:ring-[#8D437F] focus:ring-opacity-50"
                            onClick={clearFiltersSelected}
                        >
                            Limpiar Selección
                        </Button>
                    </div>
                    <div className="self-center w-fit max-w-[90vw] h-full">
                        <DataGrid
                            className="rounded-2xl"
                            columns={columns}
                            rows={rows}
                            editMode="row"
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            onRowSelectionModelChange={(
                                newRowSelectionModel
                            ) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                            pageSizeOptions={[5, 10, 20]}
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
