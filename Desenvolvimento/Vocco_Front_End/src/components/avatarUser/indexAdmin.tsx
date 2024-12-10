import { useContext, useEffect, useState } from 'react';
import {
    Avatar,
} from '@mui/material';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';
import { recuperarImagem } from '../../services/apiService';

const AvatarUserAdmin = () => {
    const [imagem, setImagem] = useState('/static/images/avatar/2.jpg');

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return null;
    }
    const adminData = authContext.admin ? decryptData(authContext.admin) : null;
    const admin = adminData ? JSON.parse(adminData) : null;

    const userData = authContext.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedImage = await recuperarImagem(user.fotoDePerfil);
                setImagem(fetchedImage || '/static/images/avatar/2.jpg');
            } catch (error) {
                console.error('Erro ao buscar foto:', error);
                throw error;
            }
        };
        fetchData();
    }, [user?.fotoDePerfil]);

    return (
        <Avatar alt={admin ? admin.nome : 'User Avatar'} src={imagem}/>
    );
};

export default AvatarUserAdmin;
