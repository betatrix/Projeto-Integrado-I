/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Button,
    Typography,
    CircularProgress,
    Stepper,
    StepLabel,
    Grid,
    Modal
} from '@mui/material';
import { useInstitution } from '../../../context/institutionContext';
import { buscarPoliticas } from '../../../services/policiesService';
import { PolicesInstitutionForm } from '../../../types/policiesTypes';
import { useNavigate } from 'react-router-dom';
import { cadastrarPoliticasInstituicao } from '../../../services/policiesInstitutionService';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/adminFooter';
import Step from '@mui/material/Step';

export const BuscaPoliticas: React.FC = () => {
    const { institutionId } = useInstitution();
    const navigate = useNavigate();
    const steps = [
        'Cadastrar Dados da Instituição',
        'Adicionar Cursos na Instituição',
        'Adicionar Políticas Afirmativas na Instituição',
    ];

    const [selectedPolicies, setSelectedPolicies] = useState<{ [key: number]: boolean }>({});
    const [policies, setPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [filteredPolicies, setFilteredPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    useEffect(() => {
        if (!institutionId) {
            console.log('No institution ID, navigating to /cadastro-instituicao');
            navigate('/cadastro');
        } else {
            const fetchPolicies = async () => {
                setLoading(true);
                try {
                    const fetchedPolicies = await buscarPoliticas(); // Pode precisar adicionar institutionId como parâmetro dependendo da API
                    setPolicies(fetchedPolicies);
                    setFilteredPolicies(fetchedPolicies);
                } catch (error) {
                    console.error('Failed to fetch policies:', error);
                }
                setLoading(false);
            };
            fetchPolicies();
        }
    }, [institutionId, navigate]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = policies.filter(policy => policy.descricao.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredPolicies(filtered);
    };

    const handlePolicySelection = (policyId: number) => {
        setSelectedPolicies(prev => ({
            ...prev,
            [policyId]: !prev[policyId]
        }));
    };

    const handleOpenConfirmModal = () => {
        const hasSelectedPolicy = Object.values(selectedPolicies).some(isSelected => isSelected);
        if (hasSelectedPolicy) {
            setConfirmModalOpen(true);
        } else {
            alert('Selecione uma política para continuar!');
        }
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleConfirmPolicies = async () => {
        if (!institutionId) {
            alert('Instituição não identificada.');
            return;
        }
        try {
            const selectedPolicyIds = Object.entries(selectedPolicies)
                .filter(([_, isSelected]) => isSelected)
                .map(([id, _]) => id);
            const responses = await Promise.all(selectedPolicyIds.map(policyId =>
                cadastrarPoliticasInstituicao(institutionId, Number(policyId))));
            console.log('Respostas:', responses);

            if (responses?.length > 0) {
                // alert('Políticas cadastradas com sucesso na Instituição');
                navigate('/pagina-inicial');
            } else {
                alert('Erro ao cadastrar políticas!');
            }

        } catch (error) {
            console.error('Erro ao cadastrar políticas na instituição:', error);
        }
        setConfirmModalOpen(false);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', marginBottom: '40px' }} >
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={2} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, margin: 'auto', mt: 4 }}>

                    <Typography variant='h4' sx={{ mb: 2 }}>Políticas da Instituição</Typography>
                    <TextField
                        label='Pesquisar Política'
                        variant='standard'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                    />
                    {loading ? <CircularProgress /> : (
                        <List>
                            {filteredPolicies.map((policy) => (
                                <ListItem key={policy.id} divider>
                                    <Checkbox
                                        checked={!!selectedPolicies[policy.id]}
                                        onChange={() => handlePolicySelection(policy.id)}
                                    />
                                    <ListItemText
                                        primary={policy.descricao}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <Grid container spacing={2} justifyContent='space-between'>
                        <Grid item xs={6} display="flex" justifyContent="flex-start">
                            <Button variant='outlined' onClick={() => navigate('/cursos')} sx={{ mt: 2, mr: 1 }}>Voltar</Button>
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end">
                            <Button variant='contained' onClick={handleOpenConfirmModal} sx={{ mt: 2 }}>Avançar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Confirm Modal */}
            <Modal
                open={confirmModalOpen}
                onClose={handleCloseConfirmModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 400
                }}>
                    <Typography variant="h6" gutterBottom>
                        Confirmação
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Você está prestes a adicionar as políticas selecionadas à instituição. Deseja continuar?
                    </Typography>
                    <Grid container spacing={2} justifyContent='space-between'>
                        <Grid item xs={6} display="flex" justifyContent="flex-start">
                            <Button variant='outlined' onClick={handleCloseConfirmModal}>Cancelar</Button>
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end">
                            <Button variant='contained' onClick={handleConfirmPolicies}>Confirmar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Footer />
        </>
    );
};

export default BuscaPoliticas;
