import React from 'react';
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import EmojiVoquinhoChorando from '../../../assets/img/emoji-voquinho-chorando.png';
import EmojiVoquinhoTriste from '../../../assets/img/emoji-voquinho-triste.png';
import EmojiVoquinhoNeutro from '../../../assets/img/emoji-voquinho-neutro.png';
import EmojiVoquinhoFeliz from '../../../assets/img/emoji-voquinho-feliz.png';
import EmojiVoquinhoApaixonado from '../../../assets/img/emoji-voquinho-apaixonado.png';
import { useTranslation } from 'react-i18next';

interface AnswerOptionsProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ value, onChange, disabled }) => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const isSmallScreen = useMediaQuery('(max-width:540px)');

    const icons = [
        { id: 'emoji1', value: 1, src: EmojiVoquinhoChorando, label: t('answerOptionsEmoji1') },
        { id: 'emoji2', value: 2, src: EmojiVoquinhoTriste, label: t('answerOptionsEmoji2') },
        { id: 'emoji3', value: 3, src: EmojiVoquinhoNeutro, label: t('answerOptionsEmoji3') },
        { id: 'emoji4', value: 4, src: EmojiVoquinhoFeliz, label: t('answerOptionsEmoji4') },
        { id: 'emoji5', value: 5, src: EmojiVoquinhoApaixonado, label: t('answerOptionsEmoji5') },
    ];

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: isSmallScreen ? 0.5 : 7,
            flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
            marginTop: isSmallScreen ? '0' : '25px',
            marginBottom: isSmallScreen ? '0' : '10px',
            overflow: 'visible',
        }}
        >

            {icons.map((iconData) => (
                <Tooltip title={iconData.label} key={iconData.value}>
                    <span>
                        <IconButton
                            onClick={() => onChange(iconData.value)}
                            color={value === iconData.value ? 'primary' : 'default'}
                            disabled={disabled}
                            // sx={{
                            //     fontSize: isSmallScreen ? '2rem' : '3rem',
                            // }}
                            style={{
                                marginLeft: '23px',
                                marginRight: '23px',
                                transition: 'filter 0.3s ease',
                                filter: value === iconData.value ? 'brightness(0.3)' : 'brightness(1)',
                                boxShadow: 'none',
                            }}
                            id={iconData.id}
                        >
                            <img src={iconData.src} alt={iconData.label}
                                style={{
                                    // maxWidth: '100%',
                                    // height: 'auto',
                                    width: isMobile ? '40px' : '67px',
                                    marginTop: isMobile ? '25px' : '0px',
                                    marginBottom: isMobile ? '20px' : '0px'
                                }} />
                        </IconButton>
                    </span>
                </Tooltip>
            ))}

        </Box>

    );
};

export default AnswerOptions;
