import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    SourceBoxStyles,
    typographySourceBody1,
    typographySourceBody2,
    typographySourceBodyGrid,
    typographySourceTitle,
    typographySourceTitleGrid
} from './styles';
import site from '../../../assets/img/icons-site.png';
import approval from '../../../assets/img/icons-approval.png';
import test from '../../../assets/img/icons-test-passed.png';

export const Sources: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Box sx={SourceBoxStyles}>
            <Typography sx={typographySourceTitle}>
                {t('sourceTitle')}
            </Typography>
            <Typography sx={typographySourceBody1}>
                {t('sourceText1')}
            </Typography>
            <Box>
                <Grid container spacing={4} justifyContent="center" alignItems="center" textAlign={'center'}>
                    <Grid item xs={9} sm={4}>
                        <img
                            src={approval}
                            alt="Logo"
                            style={{ width: '100px' }}
                        />
                        <Typography sx={typographySourceTitleGrid}>
                            {t('sourceTitleText2')}
                        </Typography>
                        <Typography sx={typographySourceBodyGrid}>
                            {t('sourceText2')}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={4}>
                        <img
                            src={site}
                            alt="Logo"
                            style={{ width: '100px' }}
                        />
                        <Typography sx={typographySourceTitleGrid}>
                            {t('sourceTitleText3')}
                        </Typography>
                        <Typography sx={typographySourceBodyGrid}>
                            {t('sourceText3')}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={4}>
                        <img
                            src={test}
                            alt="Logo"
                            style={{ width: '100px' }}
                        />
                        <Typography sx={typographySourceTitleGrid}>
                            {t('sourceTitleText4')}
                        </Typography>
                        <Typography sx={typographySourceBodyGrid}>
                            {t('sourceText4')}
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
            <Typography sx={typographySourceBody2}>
                {t('sourceText5')}
            </Typography>
        </Box>
    );
};

export default Sources;
