import Layout from "@/components/layout";
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { useNavigate } from "react-router-dom";
import {
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import { QuestionI } from "@/lib/interfaces";
import { createQuestion, deleteQuestion, fetchQuestions, updateOption, updateQuestion } from "@/controllers/questions.controller";
import AddUpdateQuestionModal from "@/components/addQuestionModal";
import ViewQuestionModal from "@/components/viewQuestionModal";

const Questions = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [rows, setRows] = useState<any[]>([]);
    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);
    const [ isViewQuestionModalOpen, setIsViewQuestionModalOpen ] = useState<boolean>(false);
    const [ toViewQuestion, setToViewQuestion ] = useState<any>(null);
    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] =
        useState<boolean>(false);
    const [isUpdateQuestionModalOpen, setIsUpdateQuestionModalOpen] =
        useState<boolean>(false);
	const [ successSnackbarOpen, setSuccessSnackbarOpen ] = useState<boolean>(false);
	const [ successSnackbarMessage, setSuccessSnackbarMessage ] = useState<string>("");
    let [toUpdateQuestion, setToUpdateQuestion] = useState<any>();

    useEffect(() => {
        if (user.userInfo.role !== "Administrador") {
            navigate("/");
        }
        async function f() {
            setQuestions(await fetchQuestions());
        }
        f();
    }, []);

    useEffect(() => {
        setRows(questions);
    }, [questions]);

    const columns: GridColDef[] = [
        {
            field: "actions",
            headerName: "",
            headerClassName: "bg-[#FFDDAF]",
            width: 130,
            renderCell: (params) => (
                <div className="flex justify-center">
                    <IconButton
                        color="error"
                        onClick={async () => {
                            const response = await deleteQuestion(params.row.id);
                            if (response) {
                                setQuestions(await fetchQuestions());
								setSuccessSnackbarOpen(true);
								setSuccessSnackbarMessage("Pregunta eliminada exitosamente");
                            }
                        }}
                    >
                        <DeleteOutlineRoundedIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={async () => {
                            setToUpdateQuestion(params.row);
                            setIsUpdateQuestionModalOpen(true);
                        }}
                    >
                        <ModeEditOutlineRoundedIcon />
                    </IconButton>
					<IconButton
						color="primary"
						onClick={async () => {
                            setIsViewQuestionModalOpen(true);
                            setToViewQuestion(params.row);
                        }}
					>
						<VisibilityOutlinedIcon />
					</IconButton>
                </div>
            ),
        },
        {
            field: "id",
            headerName: "ID",
            headerClassName: "bg-[#FFDDAF] font-bold",
            width: 70,
        },
        {
            field: "question",
            headerName: "Enunciado de la pregunta",
            headerClassName: "bg-[#FFDDAF] font-bold",
            width: 600,
        }
    ];

    const filterRowsByKeyword = (keyword: string) => {
        const filteredRows = questions.filter((row) => {
            return Object.keys(row).some((field) => {
                return row[field]
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
            });
        });
        setRows(filteredRows);
    };

    const onAddQuestion = async (newQuestion: QuestionI) => {
        await createQuestion(newQuestion);
        setQuestions(await fetchQuestions());
		setSuccessSnackbarOpen(true);
		setSuccessSnackbarMessage("Pregunta creada exitosamente");
    };

    const onUpdateQuestion = async (updatedStudent: QuestionI) => {
        await updateQuestion(updatedStudent, toUpdateQuestion.id);
        for (const option of updatedStudent.options) {
            updateOption(option, option.id);
        }
        setQuestions(await fetchQuestions());
        setToUpdateQuestion(null);
		setSuccessSnackbarOpen(true);
		setSuccessSnackbarMessage("Pregunta actualizada exitosamente");
    };

    const clearFiltersSelected = () => {
        setRows(questions);
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
                <AddUpdateQuestionModal
                    isOpen={isAddQuestionModalOpen}
                    isUpdate={false}
                    onClose={() => setIsAddQuestionModalOpen(false)}
                    onSubmit={onAddQuestion}
                />
                {toUpdateQuestion && (
                    <AddUpdateQuestionModal
                        isOpen={isUpdateQuestionModalOpen}
                        isUpdate={true}
                        questionData={toUpdateQuestion}
                        onClose={() => {
                            setIsUpdateQuestionModalOpen(false);
                            setToUpdateQuestion(null);
                        }}
                        onSubmit={onUpdateQuestion}
                    />
                )}
                {
                    toViewQuestion &&
                    <ViewQuestionModal 
                        isOpen={isViewQuestionModalOpen} 
                        questionData={toViewQuestion} 
                        onClose={()=>{setIsViewQuestionModalOpen(false); setToViewQuestion(null)}} 
                    />
                }
                <p className="text-4xl font-bold text-[#3D2E16] mt-10 text-center">
                    Gestión de Preguntas 
                </p>
                <div className="flex flex-col gap-5 items-center h-[70vh] w-screen mt-10">
                    <div className="flex flex-col md:flex-row w-[90vw] items-center p-1  rounded-full">
                        <div className="flex flex-row gap-5 flex-grow">
                            <div className="flex items-center">
                                <IconButton
                                    color="primary"
                                    onClick={() =>
                                        setIsAddQuestionModalOpen(true)
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

export default Questions;
