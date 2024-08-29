import { Box, Button} from '@mui/material';
import InitialPageHeader from '../../../components/homeHeader';
import Footer from '../../../components/adminFooter';

const DataStudent = () => {
    return (
        <>
            <InitialPageHeader />
            <Box>
                <Button>Dados do Estudante</Button>
            </Box>
            <Footer />
        </>
    );
};

export default DataStudent;
