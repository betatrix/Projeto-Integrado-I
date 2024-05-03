import { AppBar, Toolbar } from '@mui/material';
import { HeaderStyle, Logo } from './styles';

const Header = () => {
    return (
        <AppBar position="static">
            <HeaderStyle>
                <Toolbar>
                    <Logo variant="h6">
                        Vocco Logo
                    </Logo>
                </Toolbar>
            </HeaderStyle>
        </AppBar>
    );
};

export default Header;