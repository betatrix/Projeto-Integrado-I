import React from 'react';
import { Formik, Form, Field, } from 'formik';
import { TextField, Select } from 'formik-mui';
import { Button, Box, Typography, Grid, Paper, MenuItem, Stepper, StepLabel } from '@mui/material';
import Step from '@mui/material/Step';
import axios from 'axios';
import * as Yup from 'yup';
import { useInstitution } from '../../../context/institutionContext';
import { useNavigate } from 'react-router-dom';
import { cadastrarInstituicao } from '../../../services/institutionService';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
interface FormValues {
    nome: string;
    site: string;
    formaIngresso: string;
    notaMec: number | null;
    tipo: string;
    sigla: string;
    endereco: {
        logradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
}
const tipoInstituicao = [
    { label: 'Superior', value: 'SUPERIOR' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Ambos', value: 'AMBOS' },
];

export const CadastroInstituicao: React.FC = () => {
    const navigate = useNavigate();
    const { setInstitutionId } = useInstitution();
    const steps = [
        'Cadastrar Dados da Instituição',
        'Adicionar Cursos na Instituição',
        'Adicionar Políticas Afirmativas na Instituição',
    ];

    const initialValues: FormValues = {
        nome: '',
        site: '',
        formaIngresso: '',
        notaMec: null,
        sigla: '',
        tipo: '', // Usando um valor do enum
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
        },
    };

    const validationSchema = Yup.object({
        nome: Yup.string().required('O nome da instituição é obrigatório'),
        site: Yup.string()
            .required('O site é obrigatório')
            .matches(/\./, 'O site deve conter pelo menos um ponto'),
        formaIngresso: Yup.string().required('Forma de Ingresso é obrigatória'),
        notaMec: Yup.number()
            .nullable()
            .typeError('A nota deve ser um número')
            .min(1, 'A nota deve ser no mínimo 1')
            .max(10, 'A nota deve ser no máximo 10')
            .required('A nota é obrigatória'),
        sigla: Yup.string()
            .matches(/^[A-Z]+$/, 'A sigla deve estar em letras maiúsculas')
            .required('A sigla é obrigatória'),
        tipo: Yup.string()
            .required('Selecione um tipo'),
        endereco: Yup.object().shape({
            cep: Yup.string()
                .max(8, 'O CEP deve ter no máximo 8 caracteres')
                .required('O CEP é obrigatório'),
            logradouro: Yup.string().required('O logradouro é obrigatório'),
            numero: Yup.string().required('O número é obrigatório'),
            complemento: Yup.string(),
            bairro: Yup.string().required('O bairro é obrigatório'),
            cidade: Yup.string().required('A cidade é obrigatória'),
            estado: Yup.string().required('O estado é obrigatório'),
        }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const cep = event.target.value.replace(/\D/g, '');
        setFieldValue('endereco.cep', cep);
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;
                setFieldValue('endereco.logradouro', logradouro);
                setFieldValue('endereco.bairro', bairro);
                setFieldValue('endereco.cidade', localidade);
                setFieldValue('endereco.estado', uf);
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                throw error;
            }
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const response = await cadastrarInstituicao(values);
            setInstitutionId(response.id);
            navigate('/cursos', { state: { institutionId: response.id } });
        } catch (error) {
            console.error('Erro ao cadastrar instituição:', error);
            throw error;
        }
        setSubmitting(false);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ backgroundColor: '#F3F3F3', padding: '20px' }}>
                <Box sx={{ height: 50 }}></Box>
                <Box sx={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Stepper activeStep={0} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ marginTop: 5 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting }) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        maxWidth: 600,
                                        margin: 'auto',
                                    }}
                                >
                                    <Form>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            maxWidth: 600,
                                            margin: 'auto',
                                        }}>
                                            <Paper sx={{ padding: 4, marginBottom: 3, paddingBottom: 8, paddingLeft: 7, paddingRight: 7 }}>
                                                <Typography variant="h6" sx={{
                                                    fontSize: '25px', textAlign: 'left',
                                                    fontFamily: 'Roboto, monospace',
                                                    color: '#757575',
                                                    fontWeight: 'bold',
                                                }}>
                                                    Dados da Instituição
                                                </Typography>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                >

                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="nome"
                                                            label="Nome da Instituição"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="site"
                                                            label="Site"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="formaIngresso"
                                                            label="Forma de Ingresso"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={{
                                                            display: 'grid',
                                                            width: '100%',
                                                        }}>

                                                            <Field
                                                                variant="filled"
                                                                component={Select}
                                                                name="tipo"
                                                                label="Tipo de Instituição"
                                                                displayEmpty
                                                                fullWidth
                                                                inputProps={{ 'aria-label': 'Tipo de Instituição' }}
                                                            >
                                                                {tipoInstituicao.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </Field>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="sigla"
                                                            label="Sigla"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="notaMec"
                                                            type="number"
                                                            label="Nota MEC|IDEB"
                                                            variant="standard"
                                                            inputProps={{ min: 1, max: 10 }}
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            maxWidth: 600,
                                            margin: 'auto',
                                        }}>
                                            <Paper sx={{ padding: 4, marginBottom: 1, paddingBottom: 8, paddingLeft: 7, paddingRight: 7 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontSize: '25px', textAlign: 'left',
                                                        fontFamily: 'Roboto, monospace',
                                                        color: '#757575',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Endereço
                                                </Typography>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                >
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.cep"
                                                            label="CEP"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                            onChange={(
                                                                event: React.ChangeEvent<HTMLInputElement>
                                                            ) => handleCepChange(event, setFieldValue)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.numero"
                                                            label="Número"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.logradouro"
                                                            label="Logradouro"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.complemento"
                                                            label="Complemento"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.bairro"
                                                            label="Bairro"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.cidade"
                                                            label="Cidade"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.estado"
                                                            label="Estado"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <Grid
                                                container
                                                spacing={2}
                                                justifyContent="space-between"
                                                sx={{ marginBottom: 10 }}
                                            >
                                                <Grid
                                                    item
                                                    xs={12}
                                                    display="flex"
                                                    justifyContent="center"
                                                >
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
                                                        Avançar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Form>
                                </Box>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default CadastroInstituicao;
