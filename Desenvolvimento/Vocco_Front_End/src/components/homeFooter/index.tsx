import { Typography, Container } from '@mui/material';
import { FooterStyle } from './styles';

const InitialPageFooter = () => {
    return (
        <footer>
            <FooterStyle>
                <Container>
                    <Typography variant="body1" align="center">
                        © 2024 Vocco. Todos os direitos reservados.
                    </Typography>
                </Container>
            </FooterStyle>
        </footer>
    );
};

export default InitialPageFooter;