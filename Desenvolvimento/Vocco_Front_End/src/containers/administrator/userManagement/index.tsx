import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    CircularProgress,
    IconButton,
    Modal,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Grid,
    Typography,
    InputAdornment,
    Checkbox,
    Paper,
    TablePagination,
    Snackbar,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { buscarUsuarios, editarUsuario, excluirUsuario } from '../../../services/userService';
import { UserForm } from '../../../types/userTypes';
import { Formik, Form } from 'formik';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('E-mail inválido')
        .required('O e-mail é obrigatório'),
    celular: yup
        .string()
        .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'O celular deve estar no formato (XX) XXXXX-XXXX')
        .required('O celular é obrigatório'),
});

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<UserForm[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserForm | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // IDs dos usuários selecionados

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteMultipleModalOpen, setDeleteMultipleModalOpen] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessDeleteMessage, setShowSuccessDeleteMessage] = useState(false);
    const [showErrorDeleteMessage, setShowErrorDeleteMessage] = useState(false);
    const [showSuccessMassDeleteMessage, setShowSuccessMassDeleteMessage] = useState(false);
    const [showErrorMassDeleteMessage, setShowErrorMassDeleteMessage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await buscarUsuarios();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sortedUsers = fetchedUsers.sort((a: { nome: string; }, b: { nome: any; }) => a.nome.localeCompare(b.nome)); // Ordena pelo nome
                setUsers(sortedUsers);
                setFilteredUsers(sortedUsers);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                throw error;
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        if (searchValue === '') {
            // Reseta a lista ao limpar a pesquisa
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user?.nome?.toLowerCase().includes(searchValue) || // Pesquisa por nome
                user?.id?.toString().includes(searchValue) // Pesquisa por ID
            );
            setFilteredUsers(filtered);
        }
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers = filteredUsers
        .sort((a, b) => b.id - a.id)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const goToFirstPage = () => {
        setPage(0);
    };

    const goToLastPage = () => {
        setPage(totalPages - 1);
    };

    useEffect(() => {
        setPage(0);
    }, [filteredUsers]);

    const handleEditModalOpen = (user: UserForm) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedUser(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (user: UserForm) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedUser(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await excluirUsuario(selectedUser.id);

                const updatedUsers = users.map((user) =>
                    user.id === selectedUser.id ? { ...user, ativo: false } : user
                );
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);

                setShowSuccessDeleteMessage(true);
            } catch (error) {
                console.error('Erro ao inativar usuário:', error);
                setShowErrorDeleteMessage(true);
            } finally {
                handleDeleteModalClose();
            }
        }
    };

    const handleDetailModalOpen = (user: UserForm) => {
        setSelectedUser(user);
        setDetailModalOpen(true);
    };

    const handleDetailModalClose = () => {
        setSelectedUser(null);
        setDetailModalOpen(false);
    };

    const handleDeleteSelectedUsers = async () => {
        try {
            for (const userId of selectedUsers) {
                await excluirUsuario(userId);
            }

            const updatedUsers = users.map((user) =>
                selectedUsers.includes(user.id) ? { ...user, ativo: false } : user
            );
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);

            setSelectedUsers([]);
            setShowSuccessMassDeleteMessage(true);
        } catch (error) {
            console.error('Erro ao inativar usuários selecionados:', error);
            setShowErrorMassDeleteMessage(true);
        }
    };

    const handleDeleteMultipleModalOpen = () => {
        setDeleteMultipleModalOpen(true);
    };

    const handleDeleteMultipleModalClose = () => {
        setDeleteMultipleModalOpen(false);
    };

    const toggleSelectUser = (userId: number) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar Usuários"
                        variant="outlined"
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace'}}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link to="/gerenciamento-administrador">
                        <Button sx={{
                            height: '50px',
                            fontSize: '17px',
                            fontFamily: 'Roboto, monospace',
                            color: 'white',
                            backgroundColor: '#185D8E',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#104A6F',
                            },
                        }}>Administradores</Button>
                    </Link>
                </Box>

                <Box sx={{ paddingTop: 10, paddingLeft: 45, paddingRight: 45, marginBottom: 10 }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                        Usuários
                    </Typography>
                    {loading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '60px'
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ borderRight: '1px solid #ddd', width: '10rem' }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDeleteMultipleModalOpen}
                                                disabled={selectedUsers.length <= 1}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: '#185D8E',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Roboto, monospace',
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>ID</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>NOME</TableCell>
                                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>STATUS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                                <Checkbox
                                                    checked={selectedUsers.includes(user.id)}
                                                    onChange={() => toggleSelectUser(user.id)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                />
                                                <IconButton onClick={() => handleEditModalOpen(user)}
                                                    disabled={!user.ativo}
                                                    sx={{
                                                        color: user.ativo ? '#757575' : '#ccc',
                                                        '&:hover': {
                                                            color: user.ativo ? 'primary.main' : '#ccc',
                                                        },
                                                    }}
                                                >
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(user)}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{user.id}</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', fontSize: '1.1rem' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                                    {user.nome}
                                                    <IconButton size="small" onClick={() => handleDetailModalOpen(user)} sx={{
                                                        color: '#185D8E',
                                                    }}>
                                                        <VisibilityOutlinedIcon sx={{
                                                            fontSize: '18px'
                                                        }} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{user.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 7 }}>
                    <Button
                        onClick={goToFirstPage}
                        disabled={page === 0}
                        sx={{ marginRight: 2, fontFamily: 'Roboto, monospace', fontWeight: 'bold' }}
                    >
                        Primeira Página
                    </Button>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Button
                        onClick={goToLastPage}
                        disabled={page === totalPages - 1}
                        sx={{ marginLeft: 2, fontFamily: 'Roboto, monospace', fontWeight: 'bold' }}
                    >
                        Última Página
                    </Button>
                </Box>
            </Box>
            <Footer />
            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={handleEditModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 500,
                        width: '90%',
                        borderRadius: '5px'
                    }}
                >
                    {selectedUser && (
                        <Formik
                            initialValues={selectedUser || { email: '', celular: '' }} // Valores padrão para evitar erro
                            enableReinitialize
                            validationSchema={userValidationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await editarUsuario(values);
                                    setUsers(users.map((user) =>
                                        user.id === values.id ? { ...user, ...values } : user
                                    ));
                                    setFilteredUsers(filteredUsers.map((user) =>
                                        user.id === values.id ? { ...user, ...values } : user
                                    ));
                                    setShowSuccessMessage(true); // Mostra mensagem de sucesso
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar usuário:', error);
                                    setShowErrorMessage(true);
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" sx={{
                                                fontSize: '20px',
                                                marginBottom: '10px', marginTop: '10px', color: '#185D8E',
                                                fontFamily: 'Roboto, monospace', fontWeight: 'bold', textAlign: 'justify'
                                            }}>
                                                Edite os campos do Usuário selecionado:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                value={values.email}
                                                onChange={handleChange}
                                                error={touched.email && Boolean(errors.email)} // Exibe erro se o campo foi tocado e há erro
                                                helperText={touched.email && errors.email} // Mostra a mensagem de erro
                                                disabled={!values.ativo} // Desabilita se o usuário estiver inativo
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Celular"
                                                name="celular"
                                                fullWidth
                                                value={values.celular}
                                                onChange={handleChange}
                                                error={touched.celular && Boolean(errors.celular)} // Exibe erro se o campo foi tocado e há erro
                                                helperText={touched.celular && errors.celular} // Mostra a mensagem de erro
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                                                <Button
                                                    onClick={handleEditModalClose}
                                                    variant="outlined"
                                                    sx={{
                                                        height: '50px',
                                                        width: '100px',
                                                        fontSize: '17px',
                                                        fontFamily: 'Roboto, monospace',
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        backgroundColor: '#185D8E',
                                                        '&:hover': {
                                                            backgroundColor: '#104A6F',
                                                        },
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary" sx={{
                                                    height: '50px',
                                                    width: '100px',
                                                    fontSize: '17px',
                                                    fontFamily: 'Roboto, monospace',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    backgroundColor: '#185D8E',
                                                    '&:hover': {
                                                        backgroundColor: '#104A6F',
                                                    },
                                                }}>
                                                    Salvar
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>

                    )}
                </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        width: '90%',
                        borderRadius: '5px',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{
                        color: '#185D8E',
                        fontFamily: 'Roboto, monospace',
                        marginTop: 1,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'justify',
                        mb: '5px'
                    }}>
                        Confirmar Exclusão
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }}>
                        Você está prestes a excluir o usuário {selectedUser?.nome}. Deseja Continuar?
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ mt: 1 }}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDeleteUser}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    }
                                }}
                            >
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleDeleteModalClose}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    }
                                }}
                            >
                                Não
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {/* Detail Modal */}
            <Modal open={detailModalOpen} onClose={handleDetailModalClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600, borderRadius: '5px'
                }}>
                    {selectedUser && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        color: '#185D8E',
                                        fontFamily: 'Roboto, monospace',
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    {selectedUser.nome}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ padding: '20px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Dados do Usuário
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>ID:</b> {selectedUser.id}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>Status:</b> {selectedUser.ativo ? 'Ativo' : 'Inativo'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>Email:</b> {selectedUser.email}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>Celular:</b> {selectedUser.celular}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>
            <Modal
                open={deleteMultipleModalOpen}
                onClose={handleDeleteMultipleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        width: '90%',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#185D8E',
                            fontFamily: 'Roboto, monospace',
                            marginTop: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: '5px',
                        }}
                    >
                        Confirmar Exclusão
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{
                            mt: 2,
                            fontFamily: 'Poppins, sans-serif',
                            textAlign: 'justify',
                            mb: '10px',
                        }}
                    >
                        Você está prestes a excluir os usuários selecionados. Deseja continuar?
                    </Typography>
                    <Grid container justifyContent="space-between" spacing={2} sx={{ mt: 1 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                    await handleDeleteSelectedUsers();
                                    handleDeleteMultipleModalClose();
                                }}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    },
                                }}
                            >
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleDeleteMultipleModalClose}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    },
                                }}
                            >
                                Não
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {/* Mensagem de sucesso na atualização */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
            >
                <Alert onClose={() => setShowSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Usuário atualizado com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na atualização */}
            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMessage(false)}
            >
                <Alert onClose={() => setShowErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao atualizar usuário.
                </Alert>
            </Snackbar>

            {/* Mensagem de sucesso na exclusão */}
            <Snackbar
                open={showSuccessDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessDeleteMessage(false)}
            >
                <Alert onClose={() => setShowSuccessDeleteMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Usuário excluído com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na exclusão */}
            <Snackbar
                open={showErrorDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorDeleteMessage(false)}
            >
                <Alert onClose={() => setShowErrorDeleteMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao excluir usuário.
                </Alert>
            </Snackbar>

            {/* Mensagem de sucesso na exclusão múltipla */}
            <Snackbar
                open={showSuccessMassDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMassDeleteMessage(false)}
            >
                <Alert onClose={() => setShowSuccessMassDeleteMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Usuários excluídos com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na exclusão múltipla */}
            <Snackbar
                open={showErrorMassDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMassDeleteMessage(false)}
            >
                <Alert onClose={() => setShowErrorMassDeleteMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao excluir usuários.
                </Alert>
            </Snackbar>

        </>
    );
};

export default UserManagement;
