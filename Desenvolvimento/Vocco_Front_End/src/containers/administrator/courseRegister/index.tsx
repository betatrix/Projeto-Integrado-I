import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import {
    Box,
    Typography,
    Grid,
    FormControl,
    Button,
    Paper,
    Autocomplete,
    // CircularProgress,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import * as yup from 'yup';
import { Area, TipoInstituicaoCurso, CourseFormCad } from '../../../types/courseTypes';
import { buscarAreas, cadastrarCurso } from '../../../services/courseService';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate

const tiposInstituicao = [
    { label: 'Superior', value: 'SUPERIOR' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Ambos', value: 'AMBOS' },
];

const perfis = [
    { id: 1, label: 'Convencional', value: 'CONVENCIONAL' },
    { id: 2, label: 'Realista', value: 'REALISTA' },
    { id: 3, label: 'Investigativo', value: 'INVESTIGATIVO' },
    { id: 4, label: 'Social', value: 'SOCIAL' },
    { id: 5, label: 'Artístico', value: 'ARTISTICO' },
    { id: 6, label: 'Empreendedor', value: 'EMPREENDEDOR' },
];

const niveisEmpregabilidade = [
    { label: 'Alta', value: 'ALTA' },
    { label: 'Média', value: 'MEDIA' },
    { label: 'Baixa', value: 'BAIXA' },
    { label: 'Em Queda', value: 'EM_QUEDA ' },
];

const courseValidationSchema = yup.object().shape({
    descricao: yup.string().required('Descrição é obrigatória'),
    perfilId: yup.number().required('Perfil é obrigatório'),
    possiveisCarreiras: yup
        .array()
        .of(yup.string().required())
        .min(1, 'Possíveis carreiras são obrigatórias'),
    areaId: yup.number().required('Área é obrigatória'),
    tipo: yup
        .mixed<TipoInstituicaoCurso>()
        .oneOf(
            Object.values(TipoInstituicaoCurso).filter(
                (value) => value !== TipoInstituicaoCurso.INDEFINIDO
            ),
            'Tipo de Instituição é obrigatório'
        )
        .required('Tipo de Instituição é obrigatório'),
    empregabilidade: yup.string().required('Nível de empregabilidade é obrigatório'),
});

const CadastroCurso: React.FC = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [message, setMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso/erro
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar o modal
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        let isMounted = true;
        const fetchAreas = async () => {
            try {
                const fetchedAreas = await buscarAreas();
                if (isMounted) setAreas(fetchedAreas);
            } catch (error) {
                console.error('Erro ao buscar áreas:', error);
                throw error;
            }
        };
        fetchAreas();
        return () => { isMounted = false; };
    }, []);

    const initialValues: CourseFormCad = {
        descricao: '',
        perfilId: undefined,
        possiveisCarreiras: [],
        areaId: undefined,
        tipo: TipoInstituicaoCurso.INDEFINIDO,
        empregabilidade: '',
    };

    const handleSubmit = async (values: CourseFormCad) => {
        try {
            const response = await cadastrarCurso(values);
            if (response.status === 200) {
                setMessage('Curso cadastrado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar curso:', error);
            setMessage('Erro ao cadastrar curso');
        } finally {
            setIsModalOpen(true); // Abre o modal após o envio
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Fecha o modal
        setMessage(null); // Limpa a mensagem
        navigate('/gerenciamento-curso'); // Redireciona para a página de gerenciamento de cursos
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 50 }}></Box>
                <Box sx={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Box sx={{ marginTop: 5 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={courseValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                                <Form>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            maxWidth: 600,
                                            margin: 'auto',
                                        }}
                                    >
                                        <Paper
                                            sx={{ padding: 4, paddingBottom: 8, paddingLeft: 7, paddingRight: 7 }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '25px',
                                                    textAlign: 'left',
                                                    fontFamily: 'Roboto, monospace',
                                                    color: '#757575',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Dados do Curso
                                            </Typography>
                                            <Grid
                                                container
                                                spacing={2}
                                            >

                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        name="descricao"
                                                        label="Nome"
                                                        variant="standard"
                                                        size="small"
                                                        fullWidth
                                                        error={touched.descricao && Boolean(errors.descricao)}
                                                        helperText={touched.descricao && errors.descricao}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        name="possiveisCarreiras"
                                                        label="Possíveis Carreiras (Separe com vírgulas)"
                                                        variant="standard"
                                                        size="small"
                                                        fullWidth
                                                        value={values.possiveisCarreiras ? values.possiveisCarreiras.join(', ') : ''}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            setFieldValue(
                                                                'possiveisCarreiras',
                                                                e.target.value.split(',').map((carreira) => carreira.trim())
                                                            )
                                                        }
                                                        error={touched.possiveisCarreiras && Boolean(errors.possiveisCarreiras)}
                                                        helperText={touched.possiveisCarreiras && errors.possiveisCarreiras}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="perfilId">
                                                        {({ field, form, meta }: FieldProps<number>) => (
                                                            <Autocomplete
                                                                options={perfis}
                                                                getOptionLabel={(option) => option.label}
                                                                value={perfis.find((option) => option.id === field.value) || null}
                                                                onChange={(_, value) => {
                                                                    form.setFieldValue(field.name, value ? value.id : '');
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Perfil"
                                                                        variant="filled"
                                                                        error={meta.touched && Boolean(meta.error)}
                                                                        helperText={meta.touched && meta.error}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {/* {loadingAreas ? (
                                                        <CircularProgress />
                                                    ) : ( */}
                                                    <FormControl fullWidth variant="filled">
                                                        <Field name="areaId">
                                                            {({ field, form, meta }: FieldProps<number>) => (
                                                                <Autocomplete
                                                                    options={areas}
                                                                    getOptionLabel={(option) => option.descricao}
                                                                    value={areas.find((area) => area.id === field.value) || null}
                                                                    onChange={(_, value) => {
                                                                        form.setFieldValue(field.name, value ? value.id : '');
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Área"
                                                                            variant="filled"
                                                                            error={meta.touched && Boolean(meta.error)}
                                                                            helperText={meta.touched && meta.error}
                                                                        />
                                                                    )}
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormControl>
                                                    {/* )} */}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth variant="filled">
                                                        <Field name="tipo">
                                                            {({ field, form, meta }: FieldProps<TipoInstituicaoCurso>) => (
                                                                <Autocomplete
                                                                    options={tiposInstituicao}
                                                                    getOptionLabel={(option) => option.label}
                                                                    value={tiposInstituicao.find((option) => option.value === field.value) || null}
                                                                    onChange={(_, value) => {
                                                                        form.setFieldValue(field.name, value ? value.value : '');
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Tipo de Instituição"
                                                                            variant="filled"
                                                                            error={meta.touched && Boolean(meta.error)}
                                                                            helperText={meta.touched && meta.error}
                                                                        />
                                                                    )}
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth variant="filled">
                                                        <Field name="empregabilidade">
                                                            {({ field, form, meta }: FieldProps<string>) => (
                                                                <Autocomplete
                                                                    options={niveisEmpregabilidade}
                                                                    getOptionLabel={(option) => option.label}
                                                                    value={niveisEmpregabilidade.find((option) => option.value === field.value) || null}
                                                                    onChange={(_, value) => {
                                                                        form.setFieldValue(field.name, value ? value.value : '');
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Nível de Empregabilidade"
                                                                            variant="filled"
                                                                            error={meta.touched && Boolean(meta.error)}
                                                                            helperText={meta.touched && meta.error}
                                                                        />
                                                                    )}
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <Grid container
                                            spacing={2}
                                            justifyContent="center"
                                            sx={{ marginBottom: 10 }}>
                                            <Grid item xs={12}
                                                display="flex"
                                                justifyContent="center">
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    variant="contained"
                                                    sx={{
                                                        fontSize: '20px',
                                                        fontFamily: 'Roboto, monospace',
                                                        color: 'white',
                                                        backgroundColor: '#185D8E',
                                                        fontWeight: 'bold',
                                                        width: '100%',
                                                        height: '45px',
                                                    }}
                                                >
                                                    Cadastrar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>

            {/* Modal de Confirmação */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <DialogTitle id="modal-title" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>Confirmação</DialogTitle>
                <DialogContent >
                    <DialogContentText id="modal-description" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', }}>
                        Curso Cadastrado!
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={handleCloseModal}
                            sx={{
                                textAlign: 'center',
                                height: '35px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                    color: 'white',
                                }
                            }}
                        >
                            OK
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
};

export default CadastroCurso;

