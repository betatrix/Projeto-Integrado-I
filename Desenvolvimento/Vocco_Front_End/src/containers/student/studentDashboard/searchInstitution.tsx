import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Modal,
    Grid,
} from '@mui/material';
import Footer from '../../../components/adminFooter';
import { Endereco } from '../../../types/institutionTypes';
import { buscarEntidades, buscarEntidadePorId, buscarCursosPorInstituicao } from '../../../services/apiService';
import { DetailTypography, GridContainer, ListBox, SearchBox, StyledBox, StyledModal, StyledTypography } from './styles';
import InstitutionSearchHeader from '../../../components/institutionSearchHeader';
import { useTranslation } from 'react-i18next';

interface Curso {
    id: number;
    descricao: string;
}
interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    sigla: string;
    notaMec: number;
    site: string;
    endereco: Endereco;
    cursos: Curso[];
}

const InstitutionList: React.FC = () => {
    const{ t } = useTranslation();
    
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const data = await buscarEntidades('instituicao');
                setInstitutions(data);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
        };
        fetchInstitutions();
    }, []);

    const filteredInstitutions = institutions.filter(institution =>
        institution.nome.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleDetailModalOpen = async (institution: Institution) => {
        try {
            const institutionDetails = await buscarEntidadePorId('instituicao', institution.id);
            const institutionCourses = await buscarCursosPorInstituicao(institution.id);
            setSelectedInstitution({ ...institutionDetails, cursos: institutionCourses });
            setDetailModalOpen(true);
        } catch (error) {
            console.error('Erro ao obter detalhes da instituição:', error);
        }
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedInstitution(null);
    };

    return (
        <>
            <InstitutionSearchHeader />
            <StyledBox>
                <StyledTypography>
                    <Typography variant="h6">
                        {t('listInstitutionTitle')}
                    </Typography>
                </StyledTypography>
                <SearchBox>
                    <TextField
                        label={t('listInstitutionSearch')}
                        variant='standard'
                        sx={{ width: '100%' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </SearchBox>
                <ListBox>
                    <List>
                        {filteredInstitutions.map((institution) => (
                            <ListItem key={institution.id} button onClick={() => handleDetailModalOpen(institution)}>
                                <ListItemText primary={institution.nome} />
                            </ListItem>
                        ))}
                    </List>
                </ListBox>
            </StyledBox>
            {/* Details Modal */}
            <Modal
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledModal>
                    <GridContainer>
                        {selectedInstitution && (
                            <>
                                <DetailTypography>
                                    <Typography variant="h6" gutterBottom>
                                        {selectedInstitution.nome}
                                    </Typography>
                                </DetailTypography>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Dados Gerais
                                        </Typography>
                                        <Typography variant="body2">Nome: {selectedInstitution.nome}</Typography>
                                        <Typography variant="body2">Sigla: {selectedInstitution.sigla}</Typography>
                                        <Typography variant="body2">Site: {selectedInstitution.site || 'Não disponível'}</Typography>
                                        <Typography variant="body2">Nota MEC: {selectedInstitution.notaMec || 'Não disponível'}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Endereço
                                        </Typography>
                                        <Typography variant="body2">Rua: {selectedInstitution.endereco.logradouro}</Typography>
                                        <Typography variant="body2">Número: {selectedInstitution.endereco.numero}</Typography>
                                        <Typography variant="body2">Cidade: {selectedInstitution.endereco.cidade}</Typography>
                                        <Typography variant="body2">Estado: {selectedInstitution.endereco.estado}</Typography>
                                        <Typography variant="body2">CEP: {selectedInstitution.endereco.cep}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Cursos
                                        </Typography>
                                        <List dense style={{ maxHeight: 200, overflow: 'auto' }}>
                                            {selectedInstitution.cursos?.length > 0 ? (
                                                selectedInstitution.cursos.map((curso) => (
                                                    <ListItem key={curso.id}>
                                                        <ListItemText primary={curso.descricao} />
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">
                                                    Não há cursos na instituição.
                                                </Typography>
                                            )}
                                        </List>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </GridContainer>
                </StyledModal>
            </Modal>
            <Footer />
        </>
    );
};

export default InstitutionList;
