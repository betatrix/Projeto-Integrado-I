import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodIcon from '@mui/icons-material/Mood';

interface AnswerOptionsProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ value, onChange, disabled }) => {
    const icons = [
        { value: 1, icon: <MoodBadIcon fontSize="large" />, label: 'Não me identifico com isso de forma alguma' },
        { value: 2, icon: <SentimentVeryDissatisfiedIcon fontSize="large" />, label: 'Isso não reflete muito quem eu sou' },
        { value: 3, icon: <SentimentDissatisfiedIcon fontSize="large" />, label: 'Não tenho uma opinião definida sobre isso' },
        { value: 4, icon: <SentimentSatisfiedIcon fontSize="large" />, label: 'Tenho uma conexão razoável com isso' },
        { value: 5, icon: <MoodIcon fontSize="large" />, label: 'Isso reflete muito quem eu sou!' },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px' }}>
            {icons.map((iconData) => (
                <Tooltip title={iconData.label} key={iconData.value}>
                    <span>
                        <IconButton
                            onClick={() => onChange(iconData.value)}
                            color={value === iconData.value ? 'primary' : 'default'}
                            disabled={disabled}
                            style={{ margin: '0 10px' }}
                        >
                            {iconData.icon}
                        </IconButton>
                    </span>
                </Tooltip>
            ))}
        </div>
    );
};

export default AnswerOptions;
