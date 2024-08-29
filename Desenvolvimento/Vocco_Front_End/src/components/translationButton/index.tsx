import { MouseEvent, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlobeIcon from '@mui/icons-material/Language'; // Importar o ícone de globo

const LanguageMenu = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        handleClose();
    };

    return (
        <>
            <Button
                startIcon={<GlobeIcon />}
                aria-controls="language-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="text"
                sx={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    marginRight: 2,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                {i18n.language === 'en' ? 'English' : 'Português'}
            </Button>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('pt')}>Português</MenuItem>
            </Menu>
        </>
    );
};

export default LanguageMenu;
