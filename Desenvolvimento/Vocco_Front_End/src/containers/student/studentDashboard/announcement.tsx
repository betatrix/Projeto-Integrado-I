import React from 'react';
import { Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import banner from '../../../assets/img/banner.png';
import {
    AnnouncementBarContainer,
    SlidingImage,
    StyledImage,
    CloseButton
} from './styles';

interface AnnouncementBarProps {
    imageUrl: string;
    onClose: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onClose }) => {
    return (
        <AnnouncementBarContainer>
            <SlidingImage>
                <StyledImage src={banner} alt="Cursos Pré-Vestibular" />
            </SlidingImage>
            <Tooltip title='Fechar'>
                <CloseButton onClick={onClose} color="inherit">
                    <CloseIcon />
                </CloseButton>
            </Tooltip>
        </AnnouncementBarContainer>
    );
};

export default AnnouncementBar;
