import { MouseEvent, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Public } from '@mui/icons-material';

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
                startIcon={<Public sx={{
                    color: '#185D8E',
                }} />}
                aria-controls="language-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="text"
                sx={{
                    color: 'black',
                    backgroundColor: 'transparent',
                    fontFamily: 'Poppins, monospace',
                    fontWeight: '600',
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
                <MenuItem sx={{ fontFamily: 'Roboto, monospace'}} onClick={() => handleLanguageChange('en')}>English</MenuItem>
                <MenuItem sx={{ fontFamily: 'Roboto, monospace'}} onClick={() => handleLanguageChange('pt')}>Português</MenuItem>
            </Menu>
        </>
    );
};

export default LanguageMenu;
